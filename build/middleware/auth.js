'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAuth = exports.checkAuth = exports.checkAccess = exports.getUserId = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _user = require('../api/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUserId = exports.getUserId = function getUserId(req, res, next) {
  var token = req.get('Authorization');
  var decoded = _jsonwebtoken2.default.decode(token);
  console.log('Auth Middleware: ', decoded);
  req.email = decoded.email;
  //req.uid = decoded.uid
  next();
};

var checkAccess = exports.checkAccess = function checkAccess(req, res, next) {
  var token = req.get('Authorization');
  var password = req.body.credentials;
  if (token) {
    try {
      var verified = _jsonwebtoken2.default.verify(token, 'valeCollectionJWT');
      var email = verified.email;

      console.log({ email: email });
      if (email === 'valentin.mundrov@gmail.com' || email === 'iloveaquiles09@gmail.com') {
        _user2.default.user.getOne({ email: email }, 'users', ['password']).then(function (results) {
          console.log(verified.password, results[0].password.length);
          console.log(_bcrypt2.default.compareSync('19K0l0mbin075', results[0].password));
        }).catch(function (err) {
          return console.log(err.message);
        });
      } else {
        req.c_group = 16;
      }
    } catch (err) {
      res.status(500).json({ errors: { global: 'Invalid Credentials...' } });
    }
  }
  next();
};

var checkAuth = exports.checkAuth = function checkAuth(req, res, next) {
  var email = req.body.user.email;

  var token = req.get('Authorization');
  if (token) {
    try {
      var verified = _jsonwebtoken2.default.verify(token, 'valeCollectionJWT');
      if (email !== verified.email) {
        return res.status(401).json({ errors: { global: 'Unauthorized request' } });
      } else {
        req.user = verified;
      }
    } catch (err) {
      return res.status(401).json({ errors: { global: 'Auth failed: Invalid token' } });
    }
    next();
  }
};

var getAuth = exports.getAuth = function getAuth(req, res, next) {
  var token = req.get('Authorization');
  if (token) {
    try {
      var verified = _jsonwebtoken2.default.verify(token, 'valeCollectionJWT');
    } catch (err) {
      return res.status(401).json({ errors: { global: 'Auth failed: Invalid token' } });
    }
    next();
  } else {
    return res.status(401).json({ errors: { global: 'Unauthorized request' } });
  }
};
//# sourceMappingURL=auth.js.map