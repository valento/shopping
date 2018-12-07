'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sqlite = require('sqlite3');

var _sqlite2 = _interopRequireDefault(_sqlite);

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

database.prototype.findUser = function () {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['email'];

  var that = this;
  var s = Object.keys(data).map(function (key) {
    return data[key];
  });
  var k = Object.keys(data);
  //console.log(search)
  var sql = 'SELECT ' + result + ' FROM users WHERE ' + k + ' = ?';
  return new Promise(function (resolve, reject) {
    that.db.get(sql, s, function (err, row) {
      if (err) {
        reject(err);
      } else {
        console.log('DB: ', row);
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
        resolve(data);
      }
    });
  });
};

exports.default = database;
//# sourceMappingURL=user.js.map