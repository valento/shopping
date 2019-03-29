'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _lists = require('../api/lists');

var _lists2 = _interopRequireDefault(_lists);

var _auth = require('../middleware/auth');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listRouter = _express2.default.Router({
  mergeParams: true
});
//import api from '../api/mann'

listRouter.use(_bodyParser2.default.json());

//listRouter.get('/:table/:gender/:cat', (req,res,next) => {
//  const { table,gender,cat } = req.params
//  api.mann.getList( { gender,cat }, table, '*').then( rows => console.log(rows))
//})

listRouter.route('/mann/resources/:mann_id').get(_auth.getAuth, function (req, res, next) {
  var mann_id = req.params.mann_id;

  _lists2.default.list.getListResources({ mann_id: mann_id }, 'resources') //api.mann.
  .then(function (results) {
    res.status(200).json(results);
  }).catch(function (err) {
    res.status(500).json({ errors: { global: err.message } });
  });
});

listRouter.get('/m/:table/:kay', function (req, res, next) {
  var _req$params = req.params,
      kay = _req$params.kay,
      table = _req$params.table;

  var scope = ['uid', 'title_en', 'title_es', 'dscr_en', 'dscr_es', 'head', 'corp', 'waist', 'legs', 'feet', 'c_status', 'img_base', 'img_tumb', 'price', 'likes', 'rating'];
  _lists2.default.list.getList({ gender: 2 }, table, scope) //api.mann.
  .then(function (results) {
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