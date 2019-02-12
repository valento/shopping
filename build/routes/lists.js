'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mann = require('../api/mann');

var _mann2 = _interopRequireDefault(_mann);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listRouter = _express2.default.Router({
  mergeParams: true
});
listRouter.use(_bodyParser2.default.json());

//listRouter.get('/:table/:gender/:cat', (req,res,next) => {
//  const { table,gender,cat } = req.params
//  api.mann.getList( { gender,cat }, table, '*').then( rows => console.log(rows))
//})

listRouter.get('/m/:table/:gender', function (req, res, next) {
  var _req$params = req.params,
      gender = _req$params.gender,
      table = _req$params.table;

  var scope = ['uid', 'title_en', 'title_es', 'dscr_en', 'dscr_es', 'head', 'corp', 'waist', 'legs', 'feet', 'c_status', 'img_base', 'img_tumb', 'price', 'likes', 'rating'];
  _mann2.default.mann.getList({ gender: 2 }, table, scope).then(function (results) {
    if (results.length > 0) {
      res.status(200).json(results);
    } else {
      throw new Error({ message: 'User lost' });
    }
    //const collection = data.map( item => {
    //  if( item.hasOwnProperty('parent_id') ) {
    //    return { [item.parent_id]:item }
    //  } else {
    //    return item
    //  }
    //})
    //res.status(200).json(collection)
  }).catch(function (err) {
    res.status(500).json({ errors: { global: err.message } });
  });
});

exports.default = listRouter;
//# sourceMappingURL=lists.js.map