import express from 'express'
import bodyParser from 'body-parser'
import generator from 'generate-password'
import bcrypt from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'

import database from '../api/user'

const authRouter = express.Router()

const db = new database('./aapp.db')

authRouter.use(bodyParser.json())

authRouter.get('/check', (req,res,next) => {
  db.findUser( req.query )
  .then(user => {
    if(!user || undefined) {
      res.json({message: 'User is new'})
    } else {
      res.json({user})
    }
  })
  .catch (err => {
    res.json({message: 'Something went wrong'})
  })
})

authRouter.post('/', (req,res,next) => {
  let new_user = true
  const  scope = ['email','gender','username','credit','rating','language','verified']
  db.findUser( req.body.credentials, scope )
  .then( user => {
    if(!user || undefined) {
      const pass = generator.generate({
        length: 8,
        numbers: true
      })
      bcrypt.hash(pass, bcrypt.genSalt(8,()=>{}), null, (err,hash) => {
        //signup user:
        const data = Object.assign({password: hash}, req.body.credentials)
        db.signup( data )
        .then( user => {
          let { email } = user
          console.log('After Signup Insert: ', email)
          const token = jwt.sign({ email }, 'valeCollectionJWT')
          res.status(200).json({
            user: {
              token: token,
              new_user: new_user
            }
          })
        })
        .catch( err => res.status(500).json({errors: {global: err.message}}))

      })
    } else {
      new_user = false
      const token = jwt.sign({
        email: user.email
      }, 'valeCollectionJWT')

      res.status(200).json({ user: {
          token: token,
          username: user.username,
          rating: user.rating,
          gender: user.gender,
          credit: user.credit,
          language: user.language,
          verified: user.verified
        }
      })

    }
  })
  .catch( err => {
    res.status(200).json({ message: 'Welcome new one' })
  })
})

export default authRouter
