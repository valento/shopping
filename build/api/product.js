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

database.prototype.getItems = function () {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var table = arguments[1];
  var scope = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '*';

  var that = this;
  var s = Object.keys(data).map(function (key) {
    return data[key];
  });
  var k = Object.keys(data);
  console.log(s, k);
  var sql = 'SELECT ' + scope + ' FROM ' + table + ' WHERE domain_id = ?';
  return new Promise(function (resolve, reject) {
    that.db.all(sql, s, function (err, rows) {
      if (err) {
        console.log('Find Items error: ', err.message);
        reject(err);
      } else {
        console.log('DB get returns: ', rows);
        resolve(rows);
      }
    });
  });
};

database.prototype.saveItem = function () {
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

exports.default = database;
//# sourceMappingURL=product.js.map