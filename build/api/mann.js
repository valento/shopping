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
  mann: {
    getList: function getList() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var table = arguments[1];
      var scope = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '*';

      console.log(table);
      var s = Object.keys(data).map(function (key) {
        return data[key];
      });
      var k = Object.keys(data);
      var sql = 'SELECT ' + scope + ' from ' + table + ' where ' + k + '=?;';
      return new Promise(function (resolve, reject) {
        db.query(sql, s, function (err, results) {
          //console.log('Mann DB: ',results)
          if (err) return reject;
          resolve(results);
        });
      });
    },
    getListResources: function getListResources() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var table = arguments[1];
      var scope = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '*';

      console.log(table);
      var s = Object.keys(data).map(function (key) {
        return data[key];
      });
      var k = Object.keys(data);
      var sql = 'SELECT ' + scope + ' from ' + table + ' where ' + k + '=?;';
      console.log(sql, s);
      return new Promise(function (resolve, reject) {
        db.query(sql, s, function (err, results) {
          //console.log('Mann DB: ',results)
          if (err) return reject;
          resolve(results);
        });
      });
    }
  }
};
//# sourceMappingURL=mann.js.map