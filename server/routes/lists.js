import express from 'express'
import database from '../api/product'

const listRouter = express.Router({
  mergeParams: true
})

const db = new database('aapp.db')

listRouter.get('/proms/:g/:id', (req,res,next) => {
  const {g,id} = req.params
  console.log(id, g)
  //db.getItems({g}, 'proms', '*').then( rows => console.log(rows))
})

listRouter.get('/proms/:g', (req,res,next) => {
  const {g} = req.params
  console.log(g, req.path)
  db.getItems({g}, 'proms', '*').then( data => {
    console.log(data)
    res.status(200).json(data)
  })
})

export default listRouter
