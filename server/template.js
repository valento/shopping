export const template = (params) => {
  let CSS = (params.env === 'production')? '../dist/mob.css' : 'client/src/App.css'
  if(params.mobile){
    CSS = CSS.replace('station','mob')
  }
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset='utf-8'/>
        <meta name='viewport' constent='width=device-width, initial-scale=1' />
        <title>Adri Collection</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Cormorant:400,500,700" />
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css" />
      </head>
      <body>
        //
      </body>
    </html>
  `
}
