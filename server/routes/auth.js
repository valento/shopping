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
  console.log('Auth Router: ', req.body.credentials)
  const { email } = req.body.credentials
  const scope = ['email','username','credit','rating','gender']
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
        .then( user => db.findUser( user.mail, scope ))
        .then( user => {
          const token = jwt.sign({
            email: user.email,
            username: user.username
          }, 'valeCollectionJWT')
          res.status(200).json({
            user: {
              token: token,
              username: user.username,
              credit: user.credit,
              rating: user.rating,
              gender: user.gender
            }
          })
        })
        .catch( err => res.status(500).json({errors: {global: 'Apologies: DB failure... Please, try again!'}}))

      })
    } else {
      const token = jwt.sign({
        email: user.email,
        username: user.username
      }, 'valeCollectionJWT')
      user.token = token
      res.status(200).json({ user })
    }
  })
  .catch( err => {
    res.status(200).json({ message: 'Welcome new one' })
  })
})

export default authRouter
