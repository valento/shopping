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
  user: {
    signup: data => {
      let params = []
      const { email, password } = data
      params.push(email,password)
      let entries = Object.keys(data).map( key => { return '?'})
      const sql = `INSERT INTO users(email,password) VALUES(${entries})`;
      return new Promise( (resolve, reject ) => {
        db.query(sql, params, ( err ) => {
          if(err) return reject(err)
          resolve()
        })
      })
    },
    signupDummies: user => {
      let params = []
      const { email, password } = user
      params.push(email,password)
      const sql = `INSERT INTO users(email,password) VALUES(?,?)`;
      return new Promise( (resolve, reject ) => {
        db.query(sql, params, ( err ) => {
          if(err) return reject(err)
          resolve()
        })
      })
    },
    login: () => {},
    getAll: () => {},
    getOne: (data={},table,scope=['email']) => {
      const s = Object.keys(data).map( key => data[key] )
      const k = Object.keys(data)
      const sql = `SELECT ${scope} from users where ${k}=?;`
      return new Promise( (resolve,reject) => {
        db.query( sql, s,( err,results ) => {
          if(err) {
            reject(err)
          } else {
            resolve(results)
          }
        } )
      } )
    },
    create: () => {},
    save: (user={}, email) => {
      const {data} = user
      let params = []
      const upd = Object.keys(data).map( k => {
        params.push(data[k])
        return `${k}=?`
      })
      params.push(email)
      const sql = `UPDATE users set ${upd} WHERE email=?`
      console.log(sql,data)
      return new Promise( (resolve,reject ) => {
        db.query(sql,params, (err,results) => {
          if (err) return reject(err)
          resolve()
        })
      })
    },
    lastlog: email => {
      const sql = `UPDATE users set lastlog=DEFAULT WHERE email=?`
      return new Promise( (resolve,reject ) => {
        db.query(sql, email, (err,results) => {
          if (err) return reject(err)
          resolve()
        })
      })
    },
    update: () => {},
    delete: () => {},
  }
}
