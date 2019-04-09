'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressRequestLanguage = require('express-request-language');

var _expressRequestLanguage2 = _interopRequireDefault(_expressRequestLanguage);

var _user = require('./routes/user');

var _user2 = _interopRequireDefault(_user);

var _auth = require('./routes/auth');

var _auth2 = _interopRequireDefault(_auth);

var _lists = require('./routes/lists');

var _lists2 = _interopRequireDefault(_lists);

var _games = require('./routes/games');

var _games2 = _interopRequireDefault(_games);

var _gsqlRouter = require('./routes/gsqlRouter');

var _gsqlRouter2 = _interopRequireDefault(_gsqlRouter);

var _report = require('./routes/report');

var _report2 = _interopRequireDefault(_report);

var _gallery = require('./routes/gallery');

var _gallery2 = _interopRequireDefault(_gallery);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config({ silent: true });

var app = (0, _express2.default)();
var PORT = process.env.PORT;
var ENV = process.env.NODE_ENV || 'development';
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

//app.set('view engine','pug')
//app.set('views', '.views')
//app.use('/admin/static', express.static(path.join(__dirname, '../admin/build/static')))

app.use('/static', _express2.default.static(_path2.default.join(__dirname, '../client/build/static')));

//if(ENV !== 'production') {
app.use('/img', _express2.default.static(_path2.default.join(__dirname, '../client/build/img')));
//}

//app.use('/auth', authRouter)
app.use('/user', _user2.default);
app.use('/auth', _auth2.default);
app.use('/list', _lists2.default);
app.use('/games', _games2.default);
app.use('/gsql', _gsqlRouter2.default);
app.use('/report', _report2.default);
app.use('/gallery', _gallery2.default);

app.get('/ua', (0, _expressRequestLanguage2.default)({ languages: ['en', 'es'] }), function (req, res, next) {
  //let settings = {}
  var lng = req.language;
  //const lan = language.match(/^(es)/) ? 'es' : 'en'
  var mobile = req.get('user-agent').match(/(Mobile)/g) ? true : false;
  //settings.lan = lan
  //settings.mob = mobile
  res.status(200).json({ language: lng, mobile: mobile });
});

app.get('/', function (req, res) {
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