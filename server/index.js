import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'

import userRouter from './routes/user'
import authRouter from './routes/auth'

let app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/static', express.static(path.join(__dirname, '../client/build/static')))

app.use('/img', express.static(path.join(__dirname, '../client/build/img')))

//app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/auth', authRouter)

app.get('/', (req,res) => {
  console.log(req.headers)
  const language = req.get('accept-language').split(',')[0]
  const lan = language.match(/^(es)/) ? 'es' : 'en'
  const mobile = req.get('user-agent').match((/(Mobile)/g)) ? true : false
  //res.send(`Hi, there, from Express! ${lan}, ${((mobile) ? 'mobile' : 'pc')}`)
  if(process.env.NODE_ENV === 'production') {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  } else {
    res.send('This is not a Web Page')
  }
})

let server = app.listen(8080, ()=> {
  console.log('Server runnning!: ', process.env.NODE_ENV)
})
