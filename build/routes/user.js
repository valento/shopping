'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('../api/user');

var _user2 = _interopRequireDefault(_user);

var _auth = require('../middleware/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var userRouter = _express2.default.Router({
  mergeParams: true
});
//userRouter.use()
var db = new _user2.default('./aapp.db');

userRouter.get('/data', _auth.getUserId, function (req, res, next) {
  var email = req.email;

  var scope = ['email', 'username', 'credit', 'gender', 'rating', 'language', 'verified'];
  db.getUser({ email: email }, scope).then(function (user) {
    res.status(200).json({ user: user });
  }).catch(function (err) {
    res.send(500).json({ errors: { global: err.message } });
  });
});

userRouter.post('/data/', _auth.checkAuth, function (req, res, next) {
  var _req$body$user = req.body.user,
      email = _req$body$user.email,
      user = _objectWithoutProperties(_req$body$user, ['email']);
  //console.log(user)


  db.saveUser(user, email).then(function (err) {
    if (err) {
      res.send(500).json({ errors: { global: err.message } });
    } else {
      res.status(200).json({ message: 'Data saved' });
    }
  }).catch(function (err) {
    //
  });
});

exports.default = userRouter;
//# sourceMappingURL=user.js.map