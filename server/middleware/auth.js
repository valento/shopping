import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

import api from '../api/user'

dotenv.config({silent: true})

export const getUserId = (req,res,next) => {
  const token = req.get('Authorization')
  const decoded = jwt.decode(token)
  console.log('Auth Middleware: ', decoded)
  req.email = decoded.email
  req.uid = decoded.uid
  next()
}

export const getPermis = (req,res,next) => {
  const token = req.get('Authorization')
  const verified = jwt.verify(token, process.env.JWT_SECRET)
  const {email} = verified
  api.user.getOne({email},'users',['membership'])
  .then(results => {
    console.log(results[0].membership)
      req.group = results[0].membership
      next()
    }
  )
  .catch(err => console.log(err))
}

export const checkAccess = (req,res,next) => {
  const token = req.get('Authorization')
  const password = req.body.credentials
  if(token){
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET)
      const { email } = verified
      console.log({email})

      let usr, owner = false, pass
      switch (email) {
        case process.env.OWNER_1:
          usr = '1'
          owner = true
          pass = process.env.PASS_1
        break
        case process.env.OWNER_2:
          usr = '2'
          owner = true
          pass = process.env.PASS_2
        break
        default:
          usr = '0'
          owner = false
      }

    if(owner){
        api.user.getOne({email},'users',['password','memership'])
        .then( results => {
          console.log(bcrypt.compareSync(pass, results[0].password))
          req.owner = true
          req.group = 1
        })
        .catch(err => console.log(err.message))
      } else {
        req.group = 32
      }
    }
    catch(err) {
      res.status(500).json({errors: {global: 'Invalid Credentials...'}})
    }
  }
  next()
}

export const checkAuth = (req,res,next) => {
  const { email } = req.body.user
  const token = req.get('Authorization')
  if(token){
    try {
      const verified = jwt.verify(token, 'valeCollectionJWT')
      if(email !== verified.email) {
        return res.status(401).json({errors: {global: 'Unauthorized request'}})
      } else {
        req.user = verified
      }
    }
    catch(err) {
      return res.status(401).json({errors: {global: 'Auth failed: Invalid token'}})
    }
    next()
  }
}

export const getAuth = (req,res,next) => {
  const token = req.get('Authorization')
  if(token){
    try {
      const verified = jwt.verify(token, 'valeCollectionJWT')
    }
    catch(err) {
      return res.status(401).json({errors: {global: 'Auth failed: Invalid token'}})
    }
    next()
  } else {
    return res.status(401).json({errors: {global: 'Unauthorized request'}})
  }
}
