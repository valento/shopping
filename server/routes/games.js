import express from 'express'
import bodyParser from 'body-parser'
import api from '../api/games'
import { getUserId } from '../middleware/auth'

let gamesRouter = express.Router({
  mergeParams: true
})
gamesRouter.use(bodyParser.json())

gamesRouter.get('/mann/:action/:id', (req,res,next) => {
  const {action,id} = req.params
  api.countSocial(id, action)
  .then( results => res.status(200).json({data: results[`COUNT(${action})`]})
  )
  .catch(error => console.log(error))
})

gamesRouter.route('/mann')
.post( (req,res,next) => {
  const { mann_id, user_id, ...action } = req.body
  api.addSocial(mann_id.toString(),user_id.toString(), action).then( results => console.log(results))
})

export default gamesRouter
