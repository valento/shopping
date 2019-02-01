'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _user = require('./routes/user');

var _user2 = _interopRequireDefault(_user);

var _auth = require('./routes/auth');

var _auth2 = _interopRequireDefault(_auth);

var _lists = require('./routes/lists');

var _lists2 = _interopRequireDefault(_lists);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config({ silent: true });

var app = (0, _express2.default)();
var PORT = process.env.PORT;
var ENV = process.env.NODE_ENV || 'development';
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.use('/static', _express2.default.static(_path2.default.join(__dirname, '../client/build/static')));

app.use('/img', _express2.default.static(_path2.default.join(__dirname, '../client/build/img')));

//app.use('/auth', authRouter)
app.use('/user', _user2.default);
app.use('/auth', _auth2.default);
app.use('/list', _lists2.default);

app.get('/', function (req, res) {
  //console.log(req.headers)
  var language = req.get('accept-language').split(',')[0];
  var lan = language.match(/^(es)/) ? 'es' : 'en';
  var mobile = req.get('user-agent').match(/(Mobile)/g) ? true : false;
  //res.send(`Hi, there, from Express! ${lan}, ${((mobile) ? 'mobile' : 'pc')}`)
  if (ENV === 'production') {
    res.sendFile(_path2.default.join(__dirname, '../client/build/index.html'));
  } else {
    res.send('This is not a Web Page');
  }
});

var server = app.listen(PORT, function () {
  console.log('Server runnning!: ', ENV, PORT);
});
//# sourceMappingURL=index.js.map