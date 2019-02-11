import mysql from 'mysql'

const config = require('../../config')

const options = {
  user: config.get('MYSQL_USER'),
  password: config.get('MYSQL_PASSWORD'),
  database: 'aappdb'
}

if( config.get('INSTANCE_CONNECTION_NAME') && config.get('NODE_ENV') === 'production' ) {
  options.socketPath = `/cloudsql/${config.get('INSTANCE_CONNECTION_NAME')}`
} else {
  options.host = 'localhost'
  options.database = 'aappdb'
}

const db = mysql.createConnection(options)

export default {
  mann: {
    getList: (gender={},table,scope='*') => {
      console.log(table)
      const s = Object.keys(gender).map( key => gender[key] )
      const k = Object.keys(gender)
      const sql = `SELECT ${scope} from ${table} where ${k}=?;`
      return new Promise( (resolve,reject) => {
        db.query(sql,s, (err,results) => {
          console.log('Mann DB: ',results)
          if(err) return reject
            resolve(results)
        })
      })
    }
  }
}
