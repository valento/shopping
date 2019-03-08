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
  addSocial: (mann_id, user_id, action) => {
    const uid = mann_id.concat('_',user_id)
    const act = Object.keys(action)[0]
    const val = Object.values(action)[0]
    const sql = `INSERT INTO mann_actions(uid,mann_id,user_id,${act}) VALUES('${uid}',${mann_id},${user_id},${val}) ON DUPLICATE KEY UPDATE ${act}=${val}`
    return new Promise( (resolve,reject) => {
      db.query(sql, (mann_id,user_id,val), err => {
        if(err) return reject(err)
        resolve()
      })
    } )
  },
  countSocial: () => {
    //
  }
}
