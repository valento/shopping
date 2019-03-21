import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import requestLanguage from 'express-request-language'

import userRouter from './routes/user'
import authRouter from './routes/auth'
import listRouter from './routes/lists'
import gamesRouter from './routes/games'
import gsqlRouter from './routes/gsqlRouter'
import repRouter from './routes/report'
import galleryRouter from './routes/gallery'
import dotenv from 'dotenv'

dotenv.config({ silent: true })

let app = express()
let PORT = process.env.PORT
let ENV = process.env.NODE_ENV || 'development'
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//app.set('view engine','pug')
//app.set('views', '.views')
app.use('/admin/static', express.static(path.join(__dirname, '../admin/build/static')))

app.use('/static', express.static(path.join(__dirname, '../client/build/static')))

app.use('/img', express.static(path.join(__dirname, '../client/build/img')))

//app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/list', listRouter)
app.use('/games', gamesRouter)
app.use('/gsql', gsqlRouter)
app.use('/report',repRouter)
app.use('/gallery',galleryRouter)

app.get('/ua', requestLanguage({languages: ['en','es']}), (req,res,next) => {
  //let settings = {}
  const lng = req.language
  //const lan = language.match(/^(es)/) ? 'es' : 'en'
  const mobile = req.get('user-agent').match((/(Mobile)/g)) ? true : false
  console.log('Language: ',lng)
  //settings.lan = lan
  //settings.mob = mobile
  res.status(200).json({language: lng, mobile: mobile})
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
