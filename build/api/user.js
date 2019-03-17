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
    signupDummies: function signupDummies(user) {
      var params = [];
      var email = user.email,
          password = user.password;

      params.push(email, password);
      var sql = 'INSERT INTO users(email,password) VALUES(?,?)';
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
    save: function save() {
      var user = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var email = arguments[1];
      var data = user.data;

      var params = [];
      var upd = Object.keys(data).map(function (k) {
        params.push(data[k]);
        return k + '=?';
      });
      params.push(email);
      var sql = 'UPDATE users set ' + upd + ' WHERE email=?';
      console.log(sql, data);
      return new Promise(function (resolve, reject) {
        db.query(sql, params, function (err, results) {
          if (err) return reject(err);
          resolve();
        });
      });
    },
    lastlog: function lastlog(email) {
      var sql = 'UPDATE users set lastlog=DEFAULT WHERE email=?';
      return new Promise(function (resolve, reject) {
        db.query(sql, email, function (err, results) {
          if (err) return reject(err);
          resolve();
        });
      });
    },
    update: function update() {},
    delete: function _delete() {}
  }
};
//# sourceMappingURL=user.js.map