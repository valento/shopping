import SQLite from 'sqlite3'
import fs from 'fs'

function database ( url ) {
  try {
    fs.stat(url, ( err ) => {
      if(!err) {
        this.db = new SQLite.Database(url, err => {
          if(!err) {
            console.log('DB connected!')
          } else {
            throw err
          }
        })
      } else {
        throw err
      }
    })
  }
  catch(err) {
    console.log('DB Problems : ', err)
  }
}

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


export default database
