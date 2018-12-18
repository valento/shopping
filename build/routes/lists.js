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

listRouter.get('/:table/:g/:cat', function (req, res, next) {
  var _req$params = req.params,
      table = _req$params.table,
      g = _req$params.g,
      cat = _req$params.cat;

  console.log(cat, { g: g });
  db.getList({ g: g, cat: cat }, table, '*').then(function (rows) {
    return console.log(rows);
  });
});

listRouter.get('/:table/:g', function (req, res, next) {
  var _req$params2 = req.params,
      g = _req$params2.g,
      table = _req$params2.table;

  db.getList({ g: g }, table, '*').then(function (data) {
    //console.log('List Router recieves: ', data)
    var collection = data.map(function (item, index) {
      if (item.hasOwnProperty('parent_id')) {
        return _defineProperty({}, item.parent_id, item);
      } else {
        return item;
      }
    });
    res.status(200).json(collection);
  });
});

exports.default = listRouter;
//# sourceMappingURL=lists.js.map