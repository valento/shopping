'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _product = require('../api/product');

var _product2 = _interopRequireDefault(_product);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listRouter = _express2.default.Router({
  mergeParams: true
});

var db = new _product2.default('aapp.db');

listRouter.get('/proms/:g/:id', function (req, res, next) {
  var _req$params = req.params,
      g = _req$params.g,
      id = _req$params.id;

  console.log(id, g);
  //db.getItems({g}, 'proms', '*').then( rows => console.log(rows))
});

listRouter.get('/proms/:g', function (req, res, next) {
  var g = req.params.g;

  console.log(g, req.path);
  db.getItems({ g: g }, 'proms', '*').then(function (data) {
    console.log(data);
    res.status(200).json(data);
  });
});

exports.default = listRouter;
//# sourceMappingURL=lists.js.map