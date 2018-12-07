'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var template = exports.template = function template(params) {
  var CSS = params.env === 'production' ? '../dist/mob.css' : 'client/src/App.css';
  if (params.mobile) {
    CSS = CSS.replace('station', 'mob');
  }
  return '\n    <!doctype html>\n    <html>\n      <head>\n        <meta charset=\'utf-8\'/>\n        <meta name=\'viewport\' constent=\'width=device-width, initial-scale=1\' />\n        <title>Adri Collection</title>\n        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Cormorant:400,500,700" />\n        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css" />\n      </head>\n      <body>\n        //\n      </body>\n    </html>\n  ';
};
//# sourceMappingURL=template.js.map