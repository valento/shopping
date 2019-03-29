'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
  addSocial: function addSocial() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var table = arguments[1];

    var sql = void 0,
        act = void 0,
        val = void 0,
        uid = void 0;

    var _data$data = data.data,
        user_id = _data$data.user_id,
        body = _objectWithoutProperties(_data$data, ['user_id']);

    if (table === 'mann_socials') {
      var mann_id = body.mann_id,
          action = _objectWithoutProperties(body, ['mann_id']);

      uid = data.mann_id.concat('_', data.user_id);
      act = Object.keys(action)[0];
      val = Object.values(action)[0];
      sql = 'INSERT INTO ' + table + ' (uid,mann_id,user_id,' + act + ') VALUES(\'' + uid + '\',' + mann_id + ',' + user_id + ',' + val + ') ON DUPLICATE KEY UPDATE ' + act + '=' + val;
    } else {
      var resource_id = body.resource_id,
          _action = _objectWithoutProperties(body, ['resource_id']);

      act = Object.keys(_action)[0];
      val = Object.values(_action)[0];
      sql = 'INSERT INTO ' + table + ' (resource_id,user_id,' + act + ') VALUES(' + resource_id + ',' + user_id + ',\'' + val + '\')';
    }
    return new Promise(function (resolve, reject) {
      db.query(sql, function (err) {
        if (err) return reject(err);
        resolve();
      });
    });
  },
  getSocial: function getSocial() {
    var resource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var table = arguments[1];
    var scope = arguments[2];

    var id = Object.keys(resource)[0];
    var val = Object.values(resource)[0];
    var sql = 'SELECT ' + scope + ' from ' + table + ' WHERE ' + id + '=' + val;
    return new Promise(function (resolve, reject) {
      db.query(sql, function (err, results) {
        if (!err) {
          resolve(results);
        } else {
          reject(err);
        }
      });
    });
  }
};
//# sourceMappingURL=social.js.map