'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkAuth = exports.getUserId = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUserId = exports.getUserId = function getUserId(req, res, next) {
  var token = req.get('Authorization');
  var decoded = _jsonwebtoken2.default.decode(token);
  req.email = decoded.email;
  console.log('Auth Middleware: ', req.email);
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
        next();
      }
    } catch (err) {
      return res.status(401).json({ errors: { global: 'Auth failed: Invalid token' } });
    }
  }
};
//# sourceMappingURL=auth.js.map