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

var _social = require('../api/social');

var _social2 = _interopRequireDefault(_social);

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

galleryRouter.get('/access/:table/:level', _auth.getPermis, function (req, res, next) {
  //checkAccess,
  var _req$params = req.params,
      table = _req$params.table,
      level = _req$params.level;
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

galleryRouter.get('/:table/:id', _auth.getUserId, function (req, res, next) {
  var _req$params2 = req.params,
      table = _req$params2.table,
      id = _req$params2.id;

  var scope = ['liked', 'viewed', 'interested', 'ordered', 'shared'];
  _social2.default.getSocial({ resource_id: id }, table, scope).then(function (results) {
    var data = {
      liked: 1080,
      viewed: 2210,
      shared: 0,
      ordered: 0,
      interested: 0
    };
    if (results.length > 0) {
      results.forEach(function (entry) {
        Object.keys(entry).forEach(function (e) {
          if (entry[e] !== null) return data[e] += 1;
        });
      });
      res.status(200).json(data);
    } else {
      throw new Error({ message: 'No resources' });
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
      throw new Error({ message: 'No resources' });
    }
  }).catch(function (err) {
    res.status(500).json({ errors: { global: err.message } });
  });
});
galleryRouter.post('/:table', _auth.getUserId, function (req, res, next) {
  console.log(req.body);
  var data = req.body.data;

  data.user_id = req.uid;
  _social2.default.addSocial({ data: data }, req.params.table).then(function (results) {
    res.status(200).json({ success: true });
  }).catch(function (err) {
    return res.status(500);
  });
});

exports.default = galleryRouter;
//# sourceMappingURL=gallery.js.map