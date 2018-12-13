import express from 'express'
import database from '../api/user'
import { checkAuth, getUserId } from '../middleware/auth'

const userRouter = express.Router({
  mergeParams: true
})
//userRouter.use()
const db = new database('./aapp.db')

userRouter.get('/data',getUserId, (req,res,next) => {
  const { email } = req
  const scope = ['email','username','credit','gender','rating','language','verified']
  db.getUser({email}, scope)
  .then( user => {
    res.status(200).json({user: user})
  })
  .catch(err => {
    res.send(500).json({errors: {global: err.message}})
  })
})

userRouter.post('/data/', checkAuth, (req,res,next) => {
  const { email, ...user } = req.body.user
  //console.log(user)
  db.saveUser(user, email)
  .then( err => {
    if (err) {
      res.send(500).json({errors: {global: err.message}})
    } else {
      res.status(200).json({message: 'Data saved'})
    }
  })
  .catch(err => {
    //
  })
})

export default userRouter
