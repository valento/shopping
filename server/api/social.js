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
  addSocial: (data={}, table) => {
    let sql,act,val,uid
    const { user_id,...body } = data.data
    if(table === 'mann_socials') {
      const { mann_id,...action } = body
      uid = data.mann_id.concat('_',data.user_id)
      act = Object.keys(action)[0]
      val = Object.values(action)[0]
      sql = `INSERT INTO ${table} (uid,mann_id,user_id,${act}) VALUES('${uid}',${mann_id},${user_id},${val}) ON DUPLICATE KEY UPDATE ${act}=${val}`
    } else {
      const { resource_id, ...action } = body
      act = Object.keys(action)[0]
      val = Object.values(action)[0]
      sql=`INSERT INTO ${table} (resource_id,user_id,${act}) VALUES(${resource_id},${user_id},'${val}')`
    }
    return new Promise( (resolve,reject) => {
      db.query(sql, err => {
        if(err) return reject(err)
        resolve()
      })
    } )
  },
  getSocial: (resource={},table,scope) => {
    const id = Object.keys(resource)[0]
    const val = Object.values(resource)[0]
    const sql = `SELECT ${scope} from ${table} WHERE ${id}=${val}`
    return new Promise( (resolve,reject) => {
      db.query(sql, (err,results) => {
        if(!err){
          resolve(results)
        } else {
          reject(err)
        }
      })
    } )
  }
}
