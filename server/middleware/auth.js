import jwt from 'jsonwebtoken'

export const getUserId = (req,res,next) => {
  const token = req.get('Authorization')
  const decoded = jwt.decode(token)
  console.log('Auth Middleware: ', decoded)
  req.email = decoded.email

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
