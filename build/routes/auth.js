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
authRouter.use(_bodyParser2.default.json());

authRouter.get('/check', function (req, res, next) {
  db.findOne(req.query, 'users').then(function (user) {
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
  var new_user = true,
      user = void 0,
      token = void 0;
  var scope = ['email', 'gender', 'username', 'verified', 'credit', 'rating', 'language'];
  var email = req.body.credentials.email;


  _user2.default.user.getOne({ email: email }, 'users', scope).then(function (results) {
    if (results.length == 0) {
      // Sign New User:
      var pass = _generatePassword2.default.generate({
        length: 8,
        numbers: true
      });
      _bcryptNodejs2.default.hash(pass, _bcryptNodejs2.default.genSalt(8, function () {}), null, function (err, hash) {
        var data = Object.assign({ password: hash }, req.body.credentials);
        _user2.default.user.signup(data).then(function () {
          return _user2.default.user.getOne({ email: email }, 'users', scope);
        }).then(function (results) {
          token = _jsonwebtoken2.default.sign({ email: email }, process.env.JWT_SECRET);
          user = Object.assign({}, results[0], { token: token, new_user: new_user });
          res.status(200).json({ user: user });
        });
      });
    } else {
      // Send Old User Data
      token = _jsonwebtoken2.default.sign({ email: email }, process.env.JWT_SECRET);
      new_user = false;
      user = Object.assign({}, results[0], { token: token, new_user: new_user });
      console.log(user);
      res.status(200).json({ user: user });
    }
  })
  /*
    db.findOne( req.body.credentials, 'users', scope )
    .then( user => {
      if(!user || undefined) {
        const pass = generator.generate({
          length: 8,
          numbers: true
        })
        bcrypt.hash(pass, bcrypt.genSalt(8,()=>{}), null, (err,hash) => {
          //signup user:
          const data = Object.assign({password: hash}, req.body.credentials)
          db.signup( data )
          .then( data => {
            db.findOne( req.body.credentials, 'users', scope )
            .then( user => {
                const token = jwt.sign({
                  email: user.email
                }, process.env.JWT_SECRET)
  
                res.status(200).json( { user: {token: token, new_user: new_user}} )
              }
            )
            .catch( err => console.log(err))
          })
          .catch( err => res.status(500).json({errors: {global: err.message}}))
  
        })
      } else {
        new_user = false
        const token = jwt.sign({
          email: user.email,
          username: user.username,
          rating: user.rating,
          gender: user.gender,
          credit: user.credit,
          language: user.language,
          verified: user.verified
        }, process.env.JWT_SECRET)
  
        res.status(200).json({ user: { token: token, new_user: new_user }})
  
      }
    })
  */
  .catch(function (err) {
    res.status(200).json({ message: 'Welcome new one' });
  });
});

exports.default = authRouter;
//# sourceMappingURL=auth.js.map