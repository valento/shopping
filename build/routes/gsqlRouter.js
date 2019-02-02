'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = require('../../config');
console.log(config.get('MYSQL_USER'));

var options = {
  user: config.get('MYSQL_USER'),
  password: config.get('MYSQL_PASSWORD'),
  database: 'aappdb'
};

if (config.get('INSTANCE_CONNECTION_NAME') && config.get('NODE_ENV') === 'production') {
  options.socketPath = '/cloudsql/' + config.get('INSTANCE_CONNECTION_NAME');
}

console.log(options);

var db = _mysql2.default.createConnection(options);

var gsqlRouter = _express2.default.Router({
  mergeParams: true
});

gsqlRouter.route('/').get(function (req, res, next) {
  db.query('SELECT * FROM `users`;', null, function (err, res) {
    if (err) console.log(err);
    if (res) console.log(res);
  });
});

exports.default = gsqlRouter;
//# sourceMappingURL=gsqlRouter.js.map