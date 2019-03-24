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

var galleryRouter = _express2.default.Router({
  mergeParams: true
});
galleryRouter.use(_bodyParser2.default.json());

//galleryRouter.get('/:table/:gender/:cat', (req,res,next) => {
//  const { table,gender,cat } = req.params
//  api.mann.getList( { gender,cat }, table, '*').then( rows => console.log(rows))
//})

galleryRouter.get('/access/:table', _auth.getPermis, function (req, res, next) {
  //checkAccess,
  var table = req.params.table;
  var group = req.group;

  var gr = group < 8 ? 8 : group;
  console.log(gr);
  var permis = void 0;
  switch (group) {
    case 16:
      permis = 480;
      break;
    case 8:
      permis = 480;
      break;
      break;
    case 4:
      permis = 480;
      break;
    default:
      permis = 500;
  }
  //if()
  var scope = ['uid', 'name', 'created_at', 'price'];
  _lists2.default.list.getList({ c_group: gr }, table, scope).then(function (results) {
    if (results.length > 0) {
      res.status(200).json(results);
    } else {
      throw new Error({ message: 'User lost' });
    }
  }).catch(function (err) {
    res.status(500).json({ errors: { global: err.message } });
  });
});

galleryRouter.get('/:table', _auth.getUserId, function (req, res, next) {
  var table = req.params.table;
  var email = req.email;

  var scope = ['uid', 'name', 'created_at', 'price'];
  _lists2.default.list.getList({ c_permis: 500 }, table, scope).then(function (results) {
    if (results.length > 0) {
      res.status(200).json(results);
    } else {
      throw new Error({ message: 'User lost' });
    }
  }).catch(function (err) {
    res.status(500).json({ errors: { global: err.message } });
  });
});

exports.default = galleryRouter;
//# sourceMappingURL=gallery.js.map