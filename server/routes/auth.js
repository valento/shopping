import express from 'express'
import bodyParser from 'body-parser'
import generator from 'generate-password'
import bcrypt from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'

import api from '../api/user'

const authRouter = express.Router()
authRouter.use(bodyParser.json())

authRouter.get('/check', (req,res,next) => {
  db.findOne( req.query, 'users' )
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
  let new_user = true, user, token
  const scope = ['email','gender','username','verified','credit','rating','language']
  const { email } = req.body.credentials

  api.user.getOne({ email }, 'users', scope)
  .then( results => {
    if (results.length == 0) {
// Sign New User:
      const pass = generator.generate({
        length: 8,
        numbers: true
      })
      bcrypt.hash( pass, bcrypt.genSalt(8,()=>{}), null, ( err,hash ) => {
        const data = Object.assign( {password: hash}, req.body.credentials )
        api.user.signup(data)
        .then( () => api.user.getOne({ email }, 'users', scope))
        .then( results => {
          token = jwt.sign({email}, process.env.JWT_SECRET)
          user = Object.assign({},results[0],{token: token, new_user: new_user})
          res.status(200).json( {user} )
        })
      })
    } else {
// Send Old User Data
      token = jwt.sign({email}, process.env.JWT_SECRET)
      new_user = false
      user = Object.assign({},results[0],{token: token, new_user: new_user})
      console.log(user)
      res.status(200).json({user})
    }
  })
/*
  db.findOne( req.body.credentials, 'users', scope )
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
        .then( data => {
          db.findOne( req.body.credentials, 'users', scope )
          .then( user => {
              const token = jwt.sign({
                email: user.email
              }, process.env.JWT_SECRET)

              res.status(200).json( { user: {token: token, new_user: new_user}} )
            }
          )
          .catch( err => console.log(err))
        })
        .catch( err => res.status(500).json({errors: {global: err.message}}))

      })
    } else {
      new_user = false
      const token = jwt.sign({
        email: user.email,
        username: user.username,
        rating: user.rating,
        gender: user.gender,
        credit: user.credit,
        language: user.language,
        verified: user.verified
      }, process.env.JWT_SECRET)

      res.status(200).json({ user: { token: token, new_user: new_user }})

    }
  })
*/
  .catch( err => {
    res.status(200).json({ message: 'Welcome new one' })
  })
})

export default authRouter
