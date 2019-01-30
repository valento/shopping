import express from 'express'
import database from '../api/product'

const listRouter = express.Router({
  mergeParams: true
})

const db = new database('aapp.db')

listRouter.get('/:table/:domain/:cat', (req,res,next) => {
  const { table,domain,cat } = req.params
  db.getList( { domain,cat }, table, '*').then( rows => console.log(rows))
})

listRouter.get('/:table/:domain', (req,res,next) => {
  let { domain, table } = req.params
  db.getList( { domain }, table, '*')
  .then( data => {
    const collection = data.map( item => {
      if( item.hasOwnProperty('parent_id') ) {
        return { [item.parent_id]:item }
      } else {
        return item
      }
    })
    res.status(200).json(collection)
  })
  .catch( err => { res.status(500).json( {errors: {global: err.message}} ) })
})

export default listRouter
