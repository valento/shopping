import express from 'express'
import mysql from 'mysql'

const config = require('../../config')
console.log(config.get('MYSQL_USER'))

const options = {
  user: config.get('MYSQL_USER'),
  password: config.get('MYSQL_PASSWORD'),
  database: 'aappdb'
}

if( config.get('INSTANCE_CONNECTION_NAME') && config.get('NODE_ENV') === 'production' ) {
  options.socketPath = `/cloudsql/${config.get('INSTANCE_CONNECTION_NAME')}`
}

console.log(options)

const db = mysql.createConnection(options)
//console.log(db)

const gsqlRouter = express.Router({
  mergeParams: true
})

gsqlRouter.route('/')
.get( (req,res,next) => {
  db.query(
    'SELECT * FROM `users`',
    ( err,results ) => {
      if( err ) {
        console.log(err)
        return
      }
      res.json(results)
    }
  )
})

export default gsqlRouter
