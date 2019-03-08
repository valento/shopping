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
  addSocial: function addSocial(mann_id, user_id, action) {
    var uid = mann_id.concat('_', user_id);
    var act = Object.keys(action)[0];
    var val = Object.values(action)[0];
    var sql = 'INSERT INTO mann_actions(uid,mann_id,user_id,' + act + ') VALUES(\'' + uid + '\',' + mann_id + ',' + user_id + ',' + val + ') ON DUPLICATE KEY UPDATE ' + act + '=' + val;
    return new Promise(function (resolve, reject) {
      db.query(sql, (mann_id, user_id, val), function (err) {
        if (err) return reject(err);
        resolve();
      });
    });
  },
  countSocial: function countSocial() {
    //
  }
};
//# sourceMappingURL=games.js.map