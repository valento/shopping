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

database.prototype.findUser = function(data={}, result=['email']) {
  const that = this
  const s = Object.keys(data).map( key => data[key] )
  const k = Object.keys(data)
  //console.log(search)
  const sql = `SELECT ${result} FROM users WHERE ${k} = ?`
  return new Promise((resolve,reject) => {
    that.db.get(sql, s, (err,row) => {
      if(err) {
        reject(err)
      } else {
        console.log('DB: ', row)
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
        resolve (data)
      }
    })
  })
}

export default database
