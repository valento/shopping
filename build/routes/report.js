'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _auth = require('../middleware/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var repRouter = _express2.default.Router({
  paramsMerge: true
});
repRouter.use(_auth.checkAdmin);
repRouter.route('/:table/:prop').get(function (req, res, next) {
  var _req$params = req.params,
      table = _req$params.table,
      prop = _req$params.prop;

  console.log(table, prop, req.user);
});

exports.default = repRouter;
//# sourceMappingURL=report.js.map