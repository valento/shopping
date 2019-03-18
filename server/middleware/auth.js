import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import api from '../api/user'

export const getUserId = (req,res,next) => {
  const token = req.get('Authorization')
  const decoded = jwt.decode(token)
  console.log('Auth Middleware: ', decoded)
  req.email = decoded.email
  req.uid = decoded.uid
  next()
}

export const checkAdmin = (req,res,next) => {
  const token = req.get('Authorization')
  if(token){
    try {
      const verified = jwt.verify(token, 'valeCollectionJWT')
      const { email, password } = verified
      console.log({email})
    if(email === 'valentin.mundrov@gmail.com'){
        api.user.getOne({email},'users',['password'])
        .then( results => {
          console.log(verified.password, results[0].password.length)
          console.log(bcrypt.compareSync('19K0l0mbin075', results[0].password))

        })
        .catch(err => console.log(err.message))
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
