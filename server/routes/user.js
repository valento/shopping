import express from 'express'

const userRouter = express.Router({
  mergeParams: true
})

userRouter.get('/data/:user_id', (req,res,next) => {
  res.status(200).send(req.params.user_id)
})

userRouter.post('/data/:user_id', (req,res,next) => {
  res.status(200).send(req.params.user_id)
})

export default userRouter
