import express from 'express'
import bodyParser from 'body-parser'
import listapi from '../api/lists'
import socapi from '../api/social'
import { checkAuth, checkAccess, getUserId, getPermis } from '../middleware/auth'
import dotenv from 'dotenv'

const galleryRouter = express.Router({
  mergeParams: true
})
galleryRouter.use(bodyParser.json())

//galleryRouter.get('/:table/:gender/:cat', (req,res,next) => {
//  const { table,gender,cat } = req.params
//  api.mann.getList( { gender,cat }, table, '*').then( rows => console.log(rows))
//})

galleryRouter.get('/access/:table/:level', getPermis, (req,res,next) => {//checkAccess,
  const { table,level } = req.params
  const { group } = req
  let gr = (group < 8) ? 8 : group
  console.log(gr)
  let permis
  switch(group){
    case 16 :
      permis = 480
    break
    case 8 :
      permis = 480
    break
    break
    case 4 :
      permis = 480
    break
    default :
    permis = 500
  }
  //if()
  const scope = ['uid','name','created_at','price']
  listapi.list.getList({c_group: gr}, table, scope)
  .then( results => {
    if(results.length > 0){
      res.status(200).json(results)
    } else {
      throw new Error({message: 'User lost'})
    }
  })
  .catch( err => {res.status(500).json({errors: {global: err.message}})})
})

galleryRouter.get('/:table/:id', getUserId, (req,res,next) => {
  const { table,id } = req.params
  const scope = ['liked','viewed','interested','ordered','shared']
  socapi.getSocial({resource_id: id}, table, scope)
  .then( results => {
    let data = {
      liked: 1080,
      viewed: 2210,
      shared: 0,
      ordered: 0,
      interested: 0
    }
    if(results.length > 0){
      results.forEach( entry => {
        Object.keys(entry).forEach( e => {
          if(entry[e] !== null) return data[e] += 1
        })
      })
      res.status(200).json(data)
    } else {
      throw new Error({message: 'No resources'})
    }
  })
  .catch( err => { res.status(500).json({errors: {global: err.message}})})
})

galleryRouter.get('/:table', getUserId, (req,res,next) => {
  const { table } = req.params
  const { email } = req
  const scope = ['uid','name','created_at','price']
  listapi.list.getList({c_permis: 500}, table, scope)
  .then( results => {
    if(results.length > 0){
      res.status(200).json(results)
    } else {
      throw new Error({message: 'No resources'})
    }
  })
  .catch( err => { res.status(500).json({errors: {global: err.message}})})
})
galleryRouter.post('/:table', getUserId, (req,res,next) => {
console.log(req.body)
  const { data } = req.body
  data.user_id = req.uid
  socapi.addSocial({ data },req.params.table).then( results => {
    res.status(200).json({success:true})
  })
  .catch(err => res.status(500))
})

export default galleryRouter
