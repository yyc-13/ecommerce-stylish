const express = require('express')
const app = express()
const products = require('./routes/products')
const signinSignup = require('./routes/signinSignup')
const marketing = require('./routes/marketing')
const order = require('./routes/order')

const bodyParser = require('body-parser')
const multer = require('multer')

// 用於 sendFile 的路徑
const path = require('path')

const ntc = require('./ntc.js') // 用外接 app(ntc.js)來透過 color code 取 color name

// 連接 db 的 module
const config = require('./config/databaseConfig.js')
const { uploadFile } = require('./s3')
const db = config.connection

app.use('/api/1.0/products', products)
app.use('/api/1.0/user', signinSignup)
app.use('/api/1.0/marketing', marketing)
app.use('/api/1.0/order', order)

app.set('view engine', 'html')

//舊的 multer storage 方法
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname)
  }
})

const upload = multer({ storage: fileStorageEngine }) // middleware

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))
// app.set('view engine', 'pug');

const multipleUpload = upload.fields([
  { name: 'main_image', maxCount: 1 },
  { name: 'other_images', maxCount: 5 }
]) // for multiple files, name should be the same as the name in <input> tag

app.get('/add_success.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/admin/add_success.html'), function (err) {
    if (err) {
      console.error(err)
    } else {
      console.log('File sent Successfuly.')
    }
  })
})

app.get('/', (req, res) => {
  if (res.statusCode === 200) {
    res.send('Hello from Mac!')
  };
}
)

app.post('/generate-product', multipleUpload, async (req, res) => {
  // 0. 添加圖片的部分
  const file = req.files.main_image[0]
  console.log(file)
  const result = await uploadFile(file, '')
  console.log(result)

  // 1. 添加主表 products 的部分
  const { title, description, price, texture, wash, place, note, story, category } = req.body
  const mainImage = req.files.main_image[0].path
  let sql = `INSERT INTO products (title, description, price, texture, wash, place, note, story, main_image, category) VALUES ('${title}', '${description}', '${price}', '${texture}', '${wash}', '${place}', '${note}', '${story}', '${mainImage}', '${category}')`
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err)
    } else {
      console.log('添加 products 基本資料完成' + result)
    }
  })

  //  2. 添加其他圖片的路徑
  let otherImages = []
  for (let i = 0; i < req.files.other_images.length; i++) {
    otherImages.push(req.files.other_images[i].path)
  }
  otherImages = otherImages.toString()

  sql = `INSERT INTO images(images_route) VALUES('${otherImages}'
  )`
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err)
    } else {
      console.log('添加其他圖片的路徑' + result)
    }
  })
  //
  // 3. 添加 variants 屬性
  const { colorCode, sizes, stock } = req.body
  const codeResult = ntc.name(colorCode)
  const colorName = codeResult[1]

  sql = `INSERT INTO variants (colorCode, size, stock, name) VALUES ('${colorCode}', '${sizes}', ${stock}, '${colorName}')`
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err)
    } else {
      console.log('添加 variants')
    }
  })

  res.redirect('/add_success.html')
})

app.listen(3000, () => {
  console.log('server is running on port 3000')
})
