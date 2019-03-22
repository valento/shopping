import express from 'express'
import bodyParser from 'body-parser'
import api from '../api/lists'
import { checkAuth, checkAccess, getUserId } from '../middleware/auth'
import dotenv from 'dotenv'

const galleryRouter = express.Router({
  mergeParams: true
})
galleryRouter.use(bodyParser.json())

//galleryRouter.get('/:table/:gender/:cat', (req,res,next) => {
//  const { table,gender,cat } = req.params
//  api.mann.getList( { gender,cat }, table, '*').then( rows => console.log(rows))
//})

galleryRouter.get('/access/:table', checkAccess, (req,res,next) => {
  const { table } = req.params
  const { c_permis } = req
  //if()
  const scope = ['uid','name','created_at','price']
  api.list.getList({c_permis: 500}, table, scope)
  .then( results => {
    if(results.length > 0){
      res.status(200).json(results)
    } else {
      throw new Error({message: 'User lost'})
    }
  })
  .catch( err => {res.status(500).json({errors: {global: err.message}})})
})

galleryRouter.get('/:table', getUserId, (req,res,next) => {
  const { table } = req.params
  const { email } = req
  const scope = ['uid','name','created_at','price']
  api.list.getList({c_permis: 500}, table, scope)
  .then( results => {
    if(results.length > 0){
      res.status(200).json(results)
    } else {
      throw new Error({message: 'User lost'})
    }
  })
  .catch( err => { res.status(500).json({errors: {global: err.message}})})
})

export default galleryRouter
