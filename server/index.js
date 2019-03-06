import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import parser from 'ua-parser-js'

import userRouter from './routes/user'
import authRouter from './routes/auth'
import listRouter from './routes/lists'
import gsqlRouter from './routes/gsqlRouter'
import dotenv from 'dotenv'

dotenv.config({ silent: true })

let app = express()
let PORT = process.env.PORT
let ENV = process.env.NODE_ENV || 'development'
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//app.set('view engine','pug')
//app.set('views', '.views')

app.use('/static', express.static(path.join(__dirname, '../client/build/static')))

app.use('/img', express.static(path.join(__dirname, '../client/build/img')))

//app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/list', listRouter)
app.use('/gsql', gsqlRouter)

app.get('/ua', (req,res,next) => {
  //let settings = {}
  const language = req.get('accept-language').split(',')[0]
  const lan = language.match(/^(es)/) ? 'es' : 'en'
  const mobile = req.get('user-agent').match((/(Mobile)/g)) ? true : false
  //settings.lan = lan
  //settings.mob = mobile
  res.status(200).json({language: lan, mobile: mobile})
})

app.get('/', (req,res) => {
  //res.send(`Hi, there, from Express! ${lan}, ${((mobile) ? 'mobile' : 'pc')}`)
  if(ENV === 'production') {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  } else {
    res.send('This is not a Web Page')
  }
})

let server = app.listen(PORT, ()=> {
  console.log('Server runnning!: ', ENV, PORT)
})
