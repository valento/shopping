import express from 'express'
import { checkAdmin } from '../middleware/auth'

let repRouter = express.Router({
  paramsMerge: true
})
repRouter.use(checkAdmin)
repRouter.route('/:table/:prop')
.get((req,res,next) => {
  const {table,prop} = req.params
  console.log(table, prop,req.user)
})

export default repRouter
