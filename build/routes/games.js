'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _games = require('../api/games');

var _games2 = _interopRequireDefault(_games);

var _auth = require('../middleware/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var gamesRouter = _express2.default.Router({
  mergeParams: true
});
gamesRouter.use(_bodyParser2.default.json());

gamesRouter.get('/mann/:action/:id', function (req, res, next) {
  var _req$params = req.params,
      action = _req$params.action,
      id = _req$params.id;

  _games2.default.countSocial(id, action).then(function (results) {
    return res.status(200).json({ data: results['COUNT(' + action + ')'] });
  }).catch(function (error) {
    return console.log(error);
  });
});

gamesRouter.route('/mann').post(function (req, res, next) {
  var _req$body = req.body,
      mann_id = _req$body.mann_id,
      user_id = _req$body.user_id,
      action = _objectWithoutProperties(_req$body, ['mann_id', 'user_id']);

  _games2.default.addSocial(mann_id.toString(), user_id.toString(), action).then(function (results) {
    return console.log(results);
  });
});

exports.default = gamesRouter;
//# sourceMappingURL=games.js.map