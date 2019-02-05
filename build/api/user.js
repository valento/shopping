'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = require('../../config');

var options = {
  user: config.get('MYSQL_USER'),
  password: config.get('MYSQL_PASSWORD'),
  database: 'aappdb'
};

if (config.get('INSTANCE_CONNECTION_NAME') && config.get('NODE_ENV') === 'production') {
  options.socketPath = '/cloudsql/' + config.get('INSTANCE_CONNECTION_NAME');
} else {
  options.host = 'localhost';
  options.database = 'aappdb';
}

var db = _mysql2.default.createConnection(options);

exports.default = {
  user: {
    signup: function signup(data) {
      var params = [];
      var email = data.email,
          password = data.password;

      params.push(email, password);
      var entries = Object.keys(data).map(function (key) {
        return '?';
      });
      var sql = 'INSERT INTO users(email,password) VALUES(' + entries + ')';
      return new Promise(function (resolve, reject) {
        db.query(sql, params, function (err) {
          if (err) return reject(err);
          resolve();
        });
      });
    },
    login: function login() {},
    getAll: function getAll() {},
    getOne: function getOne() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var table = arguments[1];
      var scope = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ['email'];

      var s = Object.keys(data).map(function (key) {
        return data[key];
      });
      var k = Object.keys(data);
      var sql = 'SELECT ' + scope + ' from users where ' + k + '=?;';
      return new Promise(function (resolve, reject) {
        db.query(sql, s, function (err, results) {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    },
    create: function create() {},
    save: function save() {},
    update: function update() {},
    delete: function _delete() {}
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

};
//# sourceMappingURL=user.js.map