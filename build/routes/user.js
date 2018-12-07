'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userRouter = _express2.default.Router({
  mergeParams: true
});

userRouter.get('/data/:user_id', function (req, res, next) {
  res.status(200).send(req.params.user_id);
});

userRouter.post('/data/:user_id', function (req, res, next) {
  res.status(200).send(req.params.user_id);
});

exports.default = userRouter;
//# sourceMappingURL=user.js.map