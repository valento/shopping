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
      return new Promise( (resolve,reject ) => {
        db.query(sql,params, (err,results) => {
          if (err) return reject(err)
          resolve()
        })
      })
    },
    update: () => {},
    delete: () => {},
  }
}




// ============================================================================
// ============================================================================
/*
database.prototype.findOne = function(data={},table,scope=['email']) {
  const that = this
  const s = Object.keys(data).map( key => data[key] )
  const k = Object.keys(data)
  const sql = `SELECT ${scope} FROM ${table} WHERE ${k} = ?`
  console.log(sql)
  return new Promise((resolve,reject) => {
    that.db.get(sql, s, (err,row) => {
      if(err) {
        console.log('Find User error: ', err.message);
        reject(err)
      } else {
        console.log('DB find One user returns: ', row)
        resolve(row)
      }
    })
  })
}

database.prototype.listAll = function( table ) {
  const that = this
  const sql = `SELECT * FROM ${table}`
  console.log(sql)
  return new Promise((resolve,reject) => {
    that.db.all(sql, (err,row) => {
      if(err) {
        console.log('Find User error: ', err.message);
        reject(err)
      } else {
        console.log('DB get returns: ', row)
        resolve(row)
      }
    })
  })
}

database.prototype.signup = function(data){
  const that = this
  const { email, password } = data
  const params = {
    $email: email,
    $password: password
  }
  const sql = 'INSERT INTO users (email,password) VALUES ($email,$password)'
  const stm = that.db.prepare(sql)
  return new Promise((resolve, reject) => {
    stm.run( params, err => {
      console.log('DB Insert: ', params)
      if(err) {
        reject({message: 'Nothing saved'})
      } else {
        console.log('DB Insert returns: ', data);
        resolve (data)
      }
    })
  })
}

database.prototype.saveUser = function(data={}, q=[]) {
  const that = this
  const params = Object.assign({},data)
  const set = Object.keys(data).map( key => `${key} = '${data[key]}'`)
  const sql = `UPDATE users SET ${set} WHERE email = '${q}'`
  console.log(sql, set)
  return new Promise((resolve,reject) => {
    that.db.run(sql, err => {
      if(err){
        console.log(err)
        reject({errors: { global: err.message }})
      } else {
        console.log(this)
        resolve()
      }
    })
  })
}
*/

/*
  db.query(
    query,
    params,
    cb
  )
*/

/*
database.prototype.getUser = function( data={}, table='user', scope=['email']) {
  console.log('DB get User: ', data.email)
  const that = this
  const { email } = data
  const sql = `SELECT ${scope} FROM ${table} WHERE email = ?`
  console.log(sql, email)
  return new Promise (( resolve, reject ) => {
    that.db.get(sql, email, (err,row) => {
      if(err){
        reject({errors: { global: 'Wrong DB'}})
      } else {
        resolve(row)
      }
    })
  })
}
*/


//export default database
