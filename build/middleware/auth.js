'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAuth = exports.checkAuth = exports.checkAccess = exports.getPermis = exports.getUserId = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _user = require('../api/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config({ silent: true });

var getUserId = exports.getUserId = function getUserId(req, res, next) {
  var token = req.get('Authorization');
  var decoded = _jsonwebtoken2.default.decode(token);
  console.log('Auth Middleware: ', decoded);
  req.email = decoded.email;
  req.uid = decoded.uid;
  next();
};

var getPermis = exports.getPermis = function getPermis(req, res, next) {
  var token = req.get('Authorization');
  var verified = _jsonwebtoken2.default.verify(token, process.env.JWT_SECRET);
  var email = verified.email;

  _user2.default.user.getOne({ email: email }, 'users', ['membership']).then(function (results) {
    console.log(results[0].membership);
    req.group = results[0].membership;
    next();
  }).catch(function (err) {
    return console.log(err);
  });
};

var checkAccess = exports.checkAccess = function checkAccess(req, res, next) {
  var token = req.get('Authorization');
  var password = req.body.credentials;
  if (token) {
    try {
      var verified = _jsonwebtoken2.default.verify(token, process.env.JWT_SECRET);
      var email = verified.email;

      console.log({ email: email });

      var usr = void 0,
          owner = false,
          pass = void 0;
      switch (email) {
        case process.env.OWNER_1:
          usr = '1';
          owner = true;
          pass = process.env.PASS_1;
          break;
        case process.env.OWNER_2:
          usr = '2';
          owner = true;
          pass = process.env.PASS_2;
          break;
        default:
          usr = '0';
          owner = false;
      }

      if (owner) {
        _user2.default.user.getOne({ email: email }, 'users', ['password', 'memership']).then(function (results) {
          console.log(_bcrypt2.default.compareSync(pass, results[0].password));
          req.owner = true;
          req.group = 1;
        }).catch(function (err) {
          return console.log(err.message);
        });
      } else {
        req.group = 32;
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