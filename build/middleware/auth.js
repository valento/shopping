'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAuth = exports.checkAuth = exports.getUserId = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUserId = exports.getUserId = function getUserId(req, res, next) {
  var token = req.get('Authorization');
  var decoded = _jsonwebtoken2.default.decode(token);
  console.log('Auth Middleware: ', decoded);
  req.email = decoded.email;
  req.uid = decoded.uid;
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