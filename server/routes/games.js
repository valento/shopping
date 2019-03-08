import express from 'express'
import api from '../api/games'

let gamesRouter = express.Router({
  mergeParams: true
})

gamesRouter.route('/mann/')
.get( (req,res,next) => {
  //const { mann_id, ...rest } = req.body
  //api.countSocial(mann_id.toString(), rest).then( results => console.log(results) )
} )
.post( (req,res,next) => {
  const { mann_id, user_id, ...action } = req.body
  api.addSocial(mann_id.toString(),user_id.toString(), action).then( results => console.log(results))
} )

export default gamesRouter
