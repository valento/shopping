import express from 'express'
import database from '../api/product'

const listRouter = express.Router({
  mergeParams: true
})

const db = new database('aapp.db')

listRouter.get('/:table/:g/:cat', (req,res,next) => {
  const {table,g,cat} = req.params
  console.log(cat, {g})
  db.getList({g,cat}, table, '*').then( rows => console.log(rows))
})

listRouter.get('/:table/:g', (req,res,next) => {
  let {g, table} = req.params
  db.getList({g}, table, '*').then( data => {
    //console.log('List Router recieves: ', data)
    const collection = data.map( (item, index) => {
      if(item.hasOwnProperty('parent_id')) {
        return {[item.parent_id]:item}
      } else {
        return item
      }
    })
    res.status(200).json(collection)
  })
})

export default listRouter
