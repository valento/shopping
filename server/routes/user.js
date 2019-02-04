import express from 'express'
import database from '../api/user'
import { checkAuth, getUserId } from '../middleware/auth'
import dotenv from 'dotenv'
import api from '../api/user'

const userRouter = express.Router({
  mergeParams: true
})
//userRouter.use()
dotenv.config({ silent: true })
//const db = new database(process.env.DB)

//userRouter.all('/data',checkAuth)
userRouter.route('/')
.get(getUserId, (req,res,next) => {
  const { email } = req
  const scope = ['email','username','credit','gender','rating','language','verified']

  if(email === 'vale@gmail.com'){
    db.listAll('users')
    .then( users => {
      res.status(200).json({users: users})
    })
    .catch(err => {
      res.status(500).json({errors: {global: err.message}})
    })
  }

})

userRouter.route('/data')
.get(getUserId, (req,res,next) => {
  const { email } = req.body
  const scope = ['email','username','rating','credit']
  api.user.getOne({email}, 'users', scope)
  .then( (results) => {
      res.status(200).send(results)
  })
  .catch(err => {
    res.status(500).json({errors: {global: err.message}})
  })
})
.post(checkAuth,(req,res,next) => {
  //const { email } = req.user
  const { user } = req.body
  const { email, ...rest} = user
  db.saveUser(rest, email)
  .then( err => {
    if (err) {
      res.status(500).json({errors: {global: err.message}})
    } else {
      res.status(200).json({message: 'Data saved'})
    }
  })
  .catch(err => {
    //
  })
})

export default userRouter
