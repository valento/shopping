'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _product = require('../api/product');

var _product2 = _interopRequireDefault(_product);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var listRouter = _express2.default.Router({
  mergeParams: true
});

var db = new _product2.default('aapp.db');

listRouter.get('/:table/:domain/:cat', function (req, res, next) {
  var _req$params = req.params,
      table = _req$params.table,
      domain = _req$params.domain,
      cat = _req$params.cat;

  db.getList({ domain: domain, cat: cat }, table, '*').then(function (rows) {
    return console.log(rows);
  });
});

listRouter.get('/:table/:domain', function (req, res, next) {
  var _req$params2 = req.params,
      domain = _req$params2.domain,
      table = _req$params2.table;

  db.getList({ domain: domain }, table, '*').then(function (data) {
    var collection = data.map(function (item) {
      if (item.hasOwnProperty('parent_id')) {
        return _defineProperty({}, item.parent_id, item);
      } else {
        return item;
      }
    });
    res.status(200).json(collection);
  }).catch(function (err) {
    res.status(500).json({ errors: { global: err.message } });
  });
});

exports.default = listRouter;
//# sourceMappingURL=lists.js.map