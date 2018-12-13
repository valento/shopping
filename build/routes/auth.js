'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _generatePassword = require('generate-password');

var _generatePassword2 = _interopRequireDefault(_generatePassword);

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _user = require('../api/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authRouter = _express2.default.Router();

var db = new _user2.default('./aapp.db');

authRouter.use(_bodyParser2.default.json());

authRouter.get('/check', function (req, res, next) {
  db.findUser(req.query).then(function (user) {
    if (!user || undefined) {
      res.json({ message: 'User is new' });
    } else {
      res.json({ user: user });
    }
  }).catch(function (err) {
    res.json({ message: 'Something went wrong' });
  });
});

authRouter.post('/', function (req, res, next) {
  var new_user = true;
  var scope = ['email', 'gender', 'username', 'credit', 'rating', 'language', 'verified'];
  db.findUser(req.body.credentials, scope).then(function (user) {
    if (!user || undefined) {
      var pass = _generatePassword2.default.generate({
        length: 8,
        numbers: true
      });
      _bcryptNodejs2.default.hash(pass, _bcryptNodejs2.default.genSalt(8, function () {}), null, function (err, hash) {
        //signup user:
        var data = Object.assign({ password: hash }, req.body.credentials);
        db.signup(data).then(function (user) {
          var email = user.email;

          console.log('After Signup Insert: ', email);
          var token = _jsonwebtoken2.default.sign({ email: email }, 'valeCollectionJWT');
          res.status(200).json({
            user: {
              token: token,
              new_user: new_user
            }
          });
        }).catch(function (err) {
          return res.status(500).json({ errors: { global: err.message } });
        });
      });
    } else {
      new_user = false;
      var token = _jsonwebtoken2.default.sign({
        email: user.email
      }, 'valeCollectionJWT');

      res.status(200).json({ user: {
          token: token,
          username: user.username,
          rating: user.rating,
          gender: user.gender,
          credit: user.credit,
          language: user.language,
          verified: user.verified
        }
      });
    }
  }).catch(function (err) {
    res.status(200).json({ message: 'Welcome new one' });
  });
});

exports.default = authRouter;
//# sourceMappingURL=auth.js.map