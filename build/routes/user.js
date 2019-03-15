'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _auth = require('../middleware/auth');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _user = require('../api/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var userRouter = _express2.default.Router({
  mergeParams: true
});

_dotenv2.default.config({ silent: true });

userRouter.route('/').get(_auth.getUserId, function (req, res, next) {
  var email = req.email;

  var scope = ['email', 'username', 'credit', 'gender', 'rating', 'language', 'verified'];

  //if(email === 'vale@gmail.com'){
  //  db.listAll('users')
  //  .then( users => {
  //    res.status(200).json({users: users})
  //  })
  //  .catch(err => {
  //    res.status(500).json({errors: {global: err.message}})
  //  })
  //}
});

userRouter.route('/data').get(_auth.getUserId, function (req, res, next) {
  var email = req.email;

  var scope = ['uid', 'email', 'gender', 'username', 'verified', 'credit', 'rating', 'language', 'c_status'];
  _user2.default.user.getOne({ email: email }, 'users', scope).then(function (results) {
    if (results.length > 0) {
      var user = Object.assign({}, results[0]);
      res.status(200).json({ user: user });
    } else {
      throw new Error({ message: 'User lost' });
    }
  }).catch(function (err) {
    res.status(500).json({ errors: { global: err.message } });
  });
}).post(_auth.checkAuth, function (req, res, next) {
  var user = req.body.user;

  var email = user.email,
      data = _objectWithoutProperties(user, ['email']);

  _user2.default.user.save({ data: data }, email).then(function (err) {
    if (err) {
      res.status(500).json({ errors: { global: err.message } });
    } else {
      res.status(200).json({ message: 'Data saved' });
    }
  })
  //.then( ({email}) => {
  //  api.user.getOne({email},'users',scope)
  //})
  //.then( results => {
  //  if(results.length > 0){
  //    user = results[0]
  //    res.status(200).json({user})
  //  }
  //})
  .catch(function (err) {
    console.log(err.message);
  });
});

exports.default = userRouter;
//# sourceMappingURL=user.js.map