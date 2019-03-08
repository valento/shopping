'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _games = require('../api/games');

var _games2 = _interopRequireDefault(_games);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var gamesRouter = _express2.default.Router({
  mergeParams: true
});

gamesRouter.route('/mann/').get(function (req, res, next) {
  //const { mann_id, ...rest } = req.body
  //api.countSocial(mann_id.toString(), rest).then( results => console.log(results) )
}).post(function (req, res, next) {
  var _req$body = req.body,
      mann_id = _req$body.mann_id,
      user_id = _req$body.user_id,
      action = _objectWithoutProperties(_req$body, ['mann_id', 'user_id']);

  _games2.default.addSocial(mann_id.toString(), mann_id.toString(), action).then(function (results) {
    return console.log(results);
  });
});

exports.default = gamesRouter;
//# sourceMappingURL=games.js.map