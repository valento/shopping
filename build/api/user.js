'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sqlite = require('sqlite3');

var _sqlite2 = _interopRequireDefault(_sqlite);

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function database(url) {
  var _this = this;

  try {
    _fs2.default.stat(url, function (err) {
      if (!err) {
        _this.db = new _sqlite2.default.Database(url, function (err) {
          if (!err) {
            console.log('DB connected!');
          } else {
            throw err;
          }
        });
      } else {
        throw err;
      }
    });
  } catch (err) {
    console.log('DB Problems : ', err);
  }
}

database.prototype.findOne = function () {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var table = arguments[1];
  var scope = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ['email'];

  var that = this;
  var s = Object.keys(data).map(function (key) {
    return data[key];
  });
  var k = Object.keys(data);
  var sql = 'SELECT ' + scope + ' FROM ' + table + ' WHERE ' + k + ' = ?';
  console.log(sql);
  return new Promise(function (resolve, reject) {
    that.db.get(sql, s, function (err, row) {
      if (err) {
        console.log('Find User error: ', err.message);
        reject(err);
      } else {
        console.log('DB find One user returns: ', row);
        resolve(row);
      }
    });
  });
};

database.prototype.listAll = function (table) {
  var that = this;
  var sql = 'SELECT * FROM ' + table;
  console.log(sql);
  return new Promise(function (resolve, reject) {
    that.db.all(sql, function (err, row) {
      if (err) {
        console.log('Find User error: ', err.message);
        reject(err);
      } else {
        console.log('DB get returns: ', row);
        resolve(row);
      }
    });
  });
};

database.prototype.signup = function (data) {
  var that = this;
  var email = data.email,
      password = data.password;

  var params = {
    $email: email,
    $password: password
  };
  var sql = 'INSERT INTO users (email,password) VALUES ($email,$password)';
  var stm = that.db.prepare(sql);
  return new Promise(function (resolve, reject) {
    stm.run(params, function (err) {
      console.log('DB Insert: ', params);
      if (err) {
        reject({ message: 'Nothing saved' });
      } else {
        console.log('DB Insert returns: ', data);
        resolve(data);
      }
    });
  });
};

database.prototype.saveUser = function () {
  var _this2 = this;

  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var q = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var that = this;
  var params = Object.assign({}, data);
  var set = Object.keys(data).map(function (key) {
    return key + ' = \'' + data[key] + '\'';
  });
  var sql = 'UPDATE users SET ' + set + ' WHERE email = \'' + q + '\'';
  console.log(sql, set);
  return new Promise(function (resolve, reject) {
    that.db.run(sql, function (err) {
      if (err) {
        console.log(err);
        reject({ errors: { global: err.message } });
      } else {
        console.log(_this2);
        resolve();
      }
    });
  });
};

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

exports.default = database;
//# sourceMappingURL=user.js.map