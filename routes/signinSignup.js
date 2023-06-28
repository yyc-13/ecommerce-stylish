// user signin signup page
// 加密密碼
require('dotenv').config()
const crypto = require('crypto')
const express = require('express')
const router = express.Router()
// jwt 部分

const jwt = require('jsonwebtoken')
router.use(express.json())

// Fb login - 用 axios 向 graph api 取資料
const axios = require('axios')

// 用於 sendFile
const path = require('path')
// 用於取 post 的 req.body
const bodyParser = require('body-parser')
// 從 app.use 改成 router.use，因為這邊 express 建立的是 router
router.use(bodyParser.urlencoded({ extended: false }))

// 連接 database
const config = require('../config/databaseConfig.js')
// const { urlencoded } = require('body-parser')
const db = config.connection

// eslint-disable-next-line space-before-function-paren
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 })
}

router
  .route('/sign*')

  .get((req, res) => {
    res.sendFile(path.join(__dirname, '../public/admin/signinSignup.html'), function (err) {
      if (err) {
        console.error(err)
      } else {
        console.log('File sent Successfuly.')
      }
    })
    // res.send("嗨你好")
  })

router
  .route('/signin')
  .post((req, res) => {
    if (req.body.provider === 'facebook') {
      let dataData
      let output = {}
      const fbToken = req.body.accessToken
      console.log(fbToken)
      axios(`https://graph.facebook.com/me?fields=id,name,email,picture&accessToken=${fbToken}`)
        .then((result) => {
          const { name, email } = result.data
          const picture = result.data.picture.data.url
          db.query('select * from user_information where email = ? ', email, (err, result) => {
            if (err) throw err
            if (result.length < 1) {
              db.query('INSERT INTO user_information (name, email, password) VALUES (?,?,?)', [name, email, 'null'], (err, result) => {
                if (err) throw err

                const userData = {
                  provider: 'facebook',
                  name: name,
                  email: email,
                  picture: picture
                }
                const accessToken = generateAccessToken(userData)

                dataData = {
                  accessToken: accessToken,
                  access_expired: 3600,
                  user: userData
                }
                output.data = dataData
                res.send(output)
              })
            } else {
              const userData = {
                provider: 'facebook',
                name: name,
                email: email,
                picture: picture
              }
              const tokenData = { data: userData }
              const accessToken = generateAccessToken(tokenData)
              output = {
                data: {
                  accessToken: accessToken,
                  access_expired: 3600,
                  user: userData
                }
              }
              res.send(output)
            }
          }
          )
        })
        .catch(err => {
          console.log(err.stack)
        })
    } else {
      const { email, name, password } = req.body
      const hashedPassword = crypto
        .createHash('sha256')
        .update(password)
        .digest('hex')

      const output = {}
      let dataData

      db.query('SELECT * FROM  user_information where email=? && password = ?', [email, hashedPassword], (err, result) => {
        if (err) {
          console.log(err.stack)
        }
        if (result.length < 1) {
          res.send("oops! can't find user")
        } else {
          const userData = {
            provider: 'native',
            name: name,
            email: email,
            picture: '../images/waldo.jpeg'
          }
          const userOutput = { data: userData }
          const accessToken = generateAccessToken(userOutput)
          dataData = {
            accessToken: accessToken,
            access_expired: 3600,
            user: userData
          }

          console.log("I'm the user data about to send " + dataData.user)
          output.data = dataData
          console.log("signup output" + output.data)
          res.send(output.data)
        }
      })
    }
  })

router
  .route('/signup')
  .post((req, res) => {
    const { email, name, password } = req.body

    const hashedPassword = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex')

    const userupData = {
      provider: 'native',
      name: name,
      email: email,
      picture: '../images/waldo.jpeg'
    }
    const user = { data: userupData }
    const accessToken = generateAccessToken(user)

    const output = {}
    let id
    db.query('select * from user_information where email = ? ', [email], (err, result) => {
      if (err) {
        console.log(err.stack)
      }
      if (result.length > 0) {
        res.send('Email has been used.')
      } else {
        db.query('INSERT INTO user_information (name, email, password) VALUES (?,?,?)', [name, email, hashedPassword], (err, result) => {
          if (err) {
            console.log('oops. sth went wrong.')
          } else {
            id = result.insertId
            const dataData = {
              accessToken: accessToken,
              access_expired: 3600,
              user: {
                id: id,
                provider: 'native',
                name: name,
                email: email,
                picture: '../images/waldo.jpeg'
              }
            }

            output.data = dataData
            console.log(result)
            console.log('user signup successfully.')
            res.send(output.data)
          }
        })
      }
    })
  })

router
  .route('/profile')
  .get((req, res) => {
    console.log(req.body)
    console.log(req.headers)
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        res.sendStatus(403)
      } else {
        delete user.iat
        delete user.exp

        res.send(user)
      }
    })
  })

module.exports = router;
