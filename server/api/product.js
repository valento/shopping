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

database.prototype.getList = function(data={}, table, scope='*') {
  const that = this
  const s = Object.keys(data).map( key => {
    if(data[key] == 0) return 2
    return data[key]
  } )
  const k = Object.keys(data)
  console.log(s,k)
  const sql = `SELECT ${scope} FROM ${table} WHERE domain_id = ?`
  return new Promise((resolve,reject) => {
    that.db.all(sql, s, (err,rows) => {
      if(err) {
        console.log('Find Items error: ', err.message);
        reject(err)
      } else {
        console.log('DB get returns: ', rows.length)
        resolve(rows)
      }
    })
  })
}

database.prototype.saveItem = function(data={}, q=[]) {
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

export default database
