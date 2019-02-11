import express from 'express'
import bodyParser from 'body-parser'
import api from '../api/mann'
import dotenv from 'dotenv'

const listRouter = express.Router({
  mergeParams: true
})
listRouter.use(bodyParser.json())

//listRouter.get('/:table/:gender/:cat', (req,res,next) => {
//  const { table,gender,cat } = req.params
//  api.mann.getList( { gender,cat }, table, '*').then( rows => console.log(rows))
//})

listRouter.get('/:table/:gender', (req,res,next) => {
  let { gender, table } = req.params
  const scope = ['uid','title_en','title_es','dscr_en','dscr_es',
    'head','corp','waist','legs','feet','c_status','img_base','img_tumb','price','likes','rating']
  api.mann.getList({gender:2}, table, scope)
  .then( results => {
    if(results.length > 0){
      const data = results.map( obj => {
        return obj
      })
      //const data = Object.assign({}, results[0])
      res.status(200).json(data)
    } else {
      throw new Error({message: 'User lost'})
    }
    //const collection = data.map( item => {
    //  if( item.hasOwnProperty('parent_id') ) {
    //    return { [item.parent_id]:item }
    //  } else {
    //    return item
    //  }
    //})
    //res.status(200).json(collection)
  })
  .catch( err => { res.status(500).json( {errors: {global: err.message}} ) })
})

export default listRouter
