const express = require('express')
const router = express.Router()

// 連接 database
const config = require('../config/databaseConfig.js')
const db = config.connection

// product all/men/women/accessories

router
  .route('/all')
  .get((req, res) => {
    let nextPagin
    if (!req.query.paging) {
      nextPagin = 1
    } else {
      nextPagin = Number(req.query.paging) + 1
    }
    const sql = `SELECT *
      FROM products
      LEFT JOIN variants ON products.id = variants.productsid
      LEFT JOIN images ON products.id = images.productsid; `
    db.query(sql, (err, result) => {
      const output = {
        data: []
      }
      if (err) {
        console.error(err)
      } else {
        let product_id;
        let y = 0;
        for (let i = 0; i < result.length; i++) {

          // 移到 1, 3 去做 const imagePath = result[i].images_route.split(',')
          if (product_id === "undefined") {

            product_id = result[i].id
            output.data.push({
              id: result[i].id,
              title: result[i].title,
              description: result[i].description,
              price: result[i].price,
              texture: result[i].texture,
              wash: result[i].wash,
              place: result[i].place,
              note: result[i].note,
              story: result[i].story,
              colors: [{ code: result[i].colorCode, name: result[i].name }],
              sizes: [result[i].size],
              variants: [{ colorCode: result[i].colorCode, size: result[i].size, stock: result[i].stock }],
              main_image: result[i].main_image,
              images: result[i].images_route.split(',')

            })
            y = y + 1;
            var z = 0
          } else if (product_id === result[i].id) {

            const variants_object = { colorCode: result[i].colorCode, size: result[i].size, stock: result[i].stock }
            output.data[y - 1].variants.push(variants_object)
            if (output.data[y - 1].colors[z].code !== (result[i].colorCode)) {
              const colors_object = { code: result[i].colorCode, name: result[i].name }
              output.data[y - 1].colors.push(colors_object)
              z = z + 1
            }
            // 加 variant
          } else if (product_id !== result[i].id) {
            product_id = result[i].id
            output.data.push({
              id: result[i].id,
              title: result[i].title,
              description: result[i].description,
              price: result[i].price,
              texture: result[i].texture,
              wash: result[i].wash,
              place: result[i].place,
              note: result[i].note,
              story: result[i].story,
              colors: [{ code: result[i].colorCode, name: result[i].name }],
              sizes: [result[i].size],
              variants: [{ colorCode: result[i].colorCode, size: result[i].size, stock: result[i].stock }],
              main_image: result[i].main_image,
              images: result[i].images_route.split(',')

            })
            y = y + 1;
            var z = 0
          }
        }
      }
      output.data = output.data.slice((nextPagin - 1) * 6, nextPagin * 7)

      if (!output.data[6]) {
        res.send(output)
      } else {
        output.data.pop()
        output.nextPagin = nextPagin
        res.send(output)
      }
    })
  })

router
  .route('/men')
  .get((req, res) => {
    let nextPagin
    if (!req.query.paging) {
      nextPagin = 1
    } else {
      nextPagin = Number(req.query.paging) + 1
    }
    const sql = `SELECT *
      FROM products
      LEFT JOIN variants ON products.id = variants.productsid
      LEFT JOIN images ON products.id = images.productsid
      where category = "men"; `
    db.query(sql, (err, result) => {
      const output = {
        data: []
      }
      if (err) {
        console.error(err)
      } else {
        let product_id;
        let y = 0;
        for (let i = 0; i < result.length; i++) {

          // 移到 1, 3 去做 const imagePath = result[i].images_route.split(',')
          if (product_id === "undefined") {

            product_id = result[i].id
            output.data.push({
              id: result[i].id,
              title: result[i].title,
              description: result[i].description,
              price: result[i].price,
              texture: result[i].texture,
              wash: result[i].wash,
              place: result[i].place,
              note: result[i].note,
              story: result[i].story,
              colors: [{ code: result[i].colorCode, name: result[i].name }],
              sizes: [result[i].size],
              variants: [{ colorCode: result[i].colorCode, size: result[i].size, stock: result[i].stock }],
              main_image: result[i].main_image,
              images: result[i].images_route.split(',')

            })
            y = y + 1;
            var z = 0
          } else if (product_id === result[i].id) {

            const variants_object = { colorCode: result[i].colorCode, size: result[i].size, stock: result[i].stock }
            output.data[y - 1].variants.push(variants_object)
            if (output.data[y - 1].colors[z].code !== (result[i].colorCode)) {
              const colors_object = { code: result[i].colorCode, name: result[i].name }
              output.data[y - 1].colors.push(colors_object)
              z = z + 1
            }
            // 加 variant
          } else if (product_id !== result[i].id) {
            product_id = result[i].id
            output.data.push({
              id: result[i].id,
              title: result[i].title,
              description: result[i].description,
              price: result[i].price,
              texture: result[i].texture,
              wash: result[i].wash,
              place: result[i].place,
              note: result[i].note,
              story: result[i].story,
              colors: [{ code: result[i].colorCode, name: result[i].name }],
              sizes: [result[i].size],
              variants: [{ colorCode: result[i].colorCode, size: result[i].size, stock: result[i].stock }],
              main_image: result[i].main_image,
              images: result[i].images_route.split(',')

            })
            y = y + 1;
            var z = 0
          }
        }
      }
      output.data = output.data.slice((nextPagin - 1) * 6, nextPagin * 7)

      if (!output.data[6]) {
        res.send(output)
      } else {
        output.data.pop()
        output.nextPagin = nextPagin
        res.send(output)
      }
    })
  })

router
  .route('/women')
  .get((req, res) => {
    let nextPagin
    if (!req.query.paging) {
      nextPagin = 1
    } else {
      nextPagin = Number(req.query.paging) + 1
    }
    const sql = `SELECT *
      FROM products
      LEFT JOIN variants ON products.id = variants.productsid
      LEFT JOIN images ON products.id = images.productsid
      where category = "women"; `
    db.query(sql, (err, result) => {
      const output = {
        data: []
      }
      if (err) {
        console.error(err)
      } else {
        let product_id;
        let y = 0;
        for (let i = 0; i < result.length; i++) {

          // 移到 1, 3 去做 const imagePath = result[i].images_route.split(',')
          if (product_id === "undefined") {

            product_id = result[i].id
            output.data.push({
              id: result[i].id,
              title: result[i].title,
              description: result[i].description,
              price: result[i].price,
              texture: result[i].texture,
              wash: result[i].wash,
              place: result[i].place,
              note: result[i].note,
              story: result[i].story,
              colors: [{ code: result[i].colorCode, name: result[i].name }],
              sizes: [result[i].size],
              variants: [{ colorCode: result[i].colorCode, size: result[i].size, stock: result[i].stock }],
              main_image: result[i].main_image,
              images: result[i].images_route.split(',')

            })
            y = y + 1;
            var z = 0
          } else if (product_id === result[i].id) {

            const variants_object = { colorCode: result[i].colorCode, size: result[i].size, stock: result[i].stock }
            output.data[y - 1].variants.push(variants_object)
            if (output.data[y - 1].colors[z].code !== (result[i].colorCode)) {
              const colors_object = { code: result[i].colorCode, name: result[i].name }
              output.data[y - 1].colors.push(colors_object)
              z = z + 1
            }
            // 加 variant
          } else if (product_id !== result[i].id) {
            product_id = result[i].id
            output.data.push({
              id: result[i].id,
              title: result[i].title,
              description: result[i].description,
              price: result[i].price,
              texture: result[i].texture,
              wash: result[i].wash,
              place: result[i].place,
              note: result[i].note,
              story: result[i].story,
              colors: [{ code: result[i].colorCode, name: result[i].name }],
              sizes: [result[i].size],
              variants: [{ colorCode: result[i].colorCode, size: result[i].size, stock: result[i].stock }],
              main_image: result[i].main_image,
              images: result[i].images_route.split(',')

            })
            y = y + 1;
            var z = 0
          }
        }
      }
      output.data = output.data.slice((nextPagin - 1) * 6, nextPagin * 7)

      if (!output.data[6]) {
        res.send(output)
      } else {
        output.data.pop()
        output.nextPagin = nextPagin
        res.send(output)
      }
    })
  })

router
  .route('/accessories')
  .get((req, res) => {
    let nextPagin
    if (!req.query.paging) {
      nextPagin = 1
    } else {
      nextPagin = Number(req.query.paging) + 1
    }
    const sql = `SELECT *
      FROM products
      LEFT JOIN variants ON products.id = variants.productsid
      LEFT JOIN images ON products.id = images.productsid
      where category = "accessories"; `
    db.query(sql, (err, result) => {
      const output = {
        data: []
      }
      if (err) {
        console.error(err)
      } else {
        let product_id;
        let y = 0;
        for (let i = 0; i < result.length; i++) {

          // 移到 1, 3 去做 const imagePath = result[i].images_route.split(',')
          if (product_id === "undefined") {

            product_id = result[i].id
            output.data.push({
              id: result[i].id,
              title: result[i].title,
              description: result[i].description,
              price: result[i].price,
              texture: result[i].texture,
              wash: result[i].wash,
              place: result[i].place,
              note: result[i].note,
              story: result[i].story,
              colors: [{ code: result[i].colorCode, name: result[i].name }],
              sizes: [result[i].size],
              variants: [{ colorCode: result[i].colorCode, size: result[i].size, stock: result[i].stock }],
              main_image: result[i].main_image,
              images: result[i].images_route.split(',')

            })
            y = y + 1;
            var z = 0
          } else if (product_id === result[i].id) {

            const variants_object = { colorCode: result[i].colorCode, size: result[i].size, stock: result[i].stock }
            output.data[y - 1].variants.push(variants_object)
            if (output.data[y - 1].colors[z].code !== (result[i].colorCode)) {
              const colors_object = { code: result[i].colorCode, name: result[i].name }
              output.data[y - 1].colors.push(colors_object)
              z = z + 1
            }
            // 加 variant
          } else if (product_id !== result[i].id) {
            product_id = result[i].id
            output.data.push({
              id: result[i].id,
              title: result[i].title,
              description: result[i].description,
              price: result[i].price,
              texture: result[i].texture,
              wash: result[i].wash,
              place: result[i].place,
              note: result[i].note,
              story: result[i].story,
              colors: [{ code: result[i].colorCode, name: result[i].name }],
              sizes: [result[i].size],
              variants: [{ colorCode: result[i].colorCode, size: result[i].size, stock: result[i].stock }],
              main_image: result[i].main_image,
              images: result[i].images_route.split(',')

            })
            y = y + 1;
            var z = 0
          }
        }
      }
      output.data = output.data.slice((nextPagin - 1) * 6, nextPagin * 7)

      if (!output.data[6]) {
        res.send(output)
      } else {
        output.data.pop()
        output.nextPagin = nextPagin
        res.send(output)
      }
    })
  })

// product search
// 9/15 還沒改成有 variants 的版本
router
  .route('/search')
  .get((req, res) => {
    let nextPagin
    const searchKeyword = req.query.keyword
    if (!req.query.paging) {
      nextPagin = 1
    } else {
      nextPagin = Number(req.query.paging) + 1
    }

    const sql = `SELECT *
      FROM products
      LEFT JOIN variants ON products.id = variants.productsid
      LEFT JOIN images ON products.id = images.productsid
      WHERE title LIKE "%${searchKeyword}%"`
    db.query(sql, (err, result) => {
      const output = {
        data: []
      }
      if (err) {
        console.error(err)
      } else {
        for (let i = 0; i < result.length; i++) {
          const imagePath = result[i].images_route.split(',')
          output.data.push({
            id: result[i].id,
            title: result[i].title,
            description: result[i].description,
            price: result[i].price,
            texture: result[i].texture,
            wash: result[i].wash,
            place: result[i].place,
            note: result[i].note,
            story: result[i].story,
            colors: [{ code: result[i].colorCode, name: result[i].name }],
            sizes: [result[i].size],
            variants: [{ colorCode: result[i].colorCode, size: result[i].size, stock: result[i].stock }],
            main_image: result[i].main_image,
            images: imagePath
          })
        }
      }
      output.data = output.data.slice((nextPagin - 1) * 6, nextPagin * 7)

      if (!output.data[6]) {
        res.send(output)
      } else {
        output.data.pop()
        output.nextPagin = nextPagin
        res.send(output)
      }
    })
  })

router
  .route('/details')
  .get((req, res) => {
    const searchId = req.query.id
    const sql = `SELECT *
      FROM products
      LEFT JOIN variants ON products.id = variants.productsid
      LEFT JOIN images ON products.id = images.productsid
      WHERE id LIKE "${searchId}"`
    db.query(sql, (err, result) => {
      const output = {
        data: []
      }
      if (err) {
        console.error(err)
      } else {
        let y = 0;
        for (let i = 0; i < result.length; i++) {
          // 移到 1, 3 去做 const imagePath = result[i].images_route.split(',')
          if (!product_id) {
            var product_id = result[i].id
            output.data.push({
              id: result[i].id,
              title: result[i].title,
              description: result[i].description,
              price: result[i].price,
              texture: result[i].texture,
              wash: result[i].wash,
              place: result[i].place,
              note: result[i].note,
              story: result[i].story,
              colors: [{ code: result[i].colorCode, name: result[i].name }],
              sizes: [result[i].size],
              variants: [{ colorCode: result[i].colorCode, size: result[i].size, stock: result[i].stock }],
              main_image: result[i].main_image,
              images: result[i].images_route.split(',')
            })
            y = y + 1;
            var z = 0

          } else if (product_id === result[i].id) {

            const variants_object = { colorCode: result[i].colorCode, size: result[i].size, stock: result[i].stock }
            output.data[y - 1].variants.push(variants_object)
            if (output.data[y - 1].colors[z].code !== (result[i].colorCode)) {
              const colors_object = { code: result[i].colorCode, name: result[i].name }
              output.data[y - 1].colors.push(colors_object)
              z = z + 1
            }
            if (!output.data[y - 1].sizes.includes(result[i].size)) {
              output.data[y - 1].sizes.push(result[i].size)
            }
          }
        }
        // output.data[y - 1].sizes = output.data[y - 1].sizes.reverse()
      }

      res.send(output)
    })
  })

module.exports = router
