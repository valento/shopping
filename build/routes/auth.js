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

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _auth = require('../middleware/auth');

var _user = require('../api/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fb = {
  clientSecret: process.env.FB_APP_SECRET,
  clientID: process.env.FB_APP_ID,
  callbackURL: process.env.FB_CALLBACK_URL
};

var authRouter = _express2.default.Router();
authRouter.use(_bodyParser2.default.json());

authRouter.get('/facebook', function (req, res, next) {
  //
});
authRouter.get('/facebook/callback', function (req, res, next) {
  //
});

authRouter.get('/check', function (req, res, next) {
  //db.findOne( req.query, 'users' )
  //.then(user => {
  //  if(!user || undefined) {
  //    res.json({message: 'User is new'})
  //  } else {
  //    res.json({user})
  //  }
  //})
  //.catch (err => {
  //  res.json({message: 'Something went wrong'})
  //})
});

authRouter.post('/dummy', function (req, res, next) {
  var init = req.body.init;

  var data = [];
  var user = {};

  var _loop = function _loop(i) {
    var passes = _generatePassword2.default.generate({
      length: 8,
      numbers: true
    });
    _bcryptNodejs2.default.hash(passes, _bcryptNodejs2.default.genSalt(8, function () {}), null, function (err, hash) {
      user.password = hash;
      user.email = 'user' + i + '@mail.com';
      _user2.default.user.signupDummies(user).then(function () {
        return res.status(200);
      }).catch(function (err) {
        return console.log(err);
      });
    });
  };

  for (var i = init; i < init + 20; i++) {
    _loop(i);
  }
});

authRouter.post('/pass', _auth.getUserId, function (req, res, next) {
  var pass = req.body.credentials.pass;
  var email = req.email;

  _bcryptNodejs2.default.hash(pass, _bcryptNodejs2.default.genSalt(8, function () {}), null, function (err, hash) {
    if (!err) {
      var data = { password: hash, c_status: 4 };
      _user2.default.user.save({ data: data }, email).then(function () {
        var token = _jsonwebtoken2.default.sign({ email: email, password: hash }, process.env.JWT_SECRET);
        var user = Object.assign({}, { token: token, c_status: 4 });
        res.status(200).json({ user: user });
      }).catch(function (err) {
        res.status(500);
      });
    }
  });
});
authRouter.post('/', function (req, res, next) {
  var new_user = true,
      user = void 0,
      token = void 0;
  var scope = ['uid', 'email', 'gender', 'username', 'verified', 'credit', 'rating', 'language', 'c_status'];
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
    res.status(500).json({ message: 'Something went wrong' });
  });
});

exports.default = authRouter;
//# sourceMappingURL=auth.js.map