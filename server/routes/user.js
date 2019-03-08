import express from 'express'
import { checkAuth, getUserId } from '../middleware/auth'
import dotenv from 'dotenv'
import api from '../api/user'

const userRouter = express.Router({
  mergeParams: true
})

dotenv.config({ silent: true })

userRouter.route('/')
.get(getUserId, (req,res,next) => {
  const { email } = req
  const scope = ['email','username','credit','gender','rating','language','verified']

  //if(email === 'vale@gmail.com'){
  //  db.listAll('users')
  //  .then( users => {
  //    res.status(200).json({users: users})
  //  })
  //  .catch(err => {
  //    res.status(500).json({errors: {global: err.message}})
  //  })
  //}

})

userRouter.route('/data')
.get(getUserId, (req,res,next) => {
  const { email } = req
  const scope = ['uid','email','gender','username','verified','credit','rating','language']
  api.user.getOne({email}, 'users', scope)
  .then( results => {
    if(results.length > 0){
      const user = Object.assign({}, results[0])
      res.status(200).json({user})
    } else {
      throw new Error({message: 'User lost'})
    }
  })
  .catch(err => {
    res.status(500).json({errors: {global: err.message}})
  })
})
.post(checkAuth,(req,res,next) => {
  let { user } = req.body
  const { email, ...data} = user
  api.user.save({data}, email)
  .then( err => {
    if (err) {
      res.status(500).json({errors: {global: err.message}})
    } else {
      res.status(200).json({message: 'Data saved'})
    }
  })
  //.then( ({email}) => {
  //  api.user.getOne({email},'users',scope)
  //})
  //.then( results => {
  //  if(results.length > 0){
  //    user = results[0]
  //    res.status(200).json({user})
  //  }
  //})
  .catch(err => {
    console.log(err.message)
  })
})

export default userRouter
