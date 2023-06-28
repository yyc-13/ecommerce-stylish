require("dotenv").config();
const crypto = require("crypto");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
router.use(express.json());

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));

// 連接 db
const config = require("../config/databaseConfig.js");
const { default: axios } = require("axios");

const db = config.connection;

router.route("/payments").get((req, res) => {
  db.query(
    "select iduser_orders, total, name from user_orders where iduser_orders>1100",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        let totals = [];
        let total1 = 0,
          total2 = 0,
          total3 = 0,
          total4 = 0,
          total5 = 0;
        for (let x = 0; x < result.length; x++) {
          let name = result[x].name;
          if (name == 1) {
            total1 += result[x].total;
          } else if (name == 2) {
            total2 += result[x].total;
          } else if (name == 3) {
            total3 += result[x].total;
          } else if (name == 4) {
            total4 += result[x].total;
          } else {
            total5 += result[x].total;
          }
        }
        console.log(total1);
        totals.push(total1);
        totals.push(total2);
        totals.push(total3);
        totals.push(total4);
        totals.push(total5);
        let data = {};
        data.data = [];
        for (let i = 0; i < 5; i++) {
          const variant = {};
          variant.user_id = i + 1;
          variant.total_payment = totals[i];
          data.data.push(variant);
        }
        console.log(data);
        res.send(data);
      }
    }
  );
});
router.route("/checkout").post((req, res) => {
  const { prime } = req.body;
  const { shipping, payment, subtotal, freight, total } = req.body.order;
  const { name, phone, email, address, time } = req.body.order.recipient;
  const id = req.body.order.list[0].id;
  console.log(id);
  const product_name = req.body.order.list[0].name;
  const product_price = req.body.order.list[0].price;
  const product_color_code = req.body.order.list[0].color.code;
  const product_color_name = req.body.order.list[0].color.name;
  const size = req.body.order.list[0].size;
  const qty = req.body.order.list[0].qty;

  db.query(
    "INSERT INTO user_orders (payment_status, prime, shipping, payment, subtotal, freight, total, name, phone, email, address, time, product_id, product_name, product_price, product_color_code, product_color_name, size, qty ) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      "unpaid",
      prime,
      shipping,
      payment,
      subtotal,
      freight,
      total,
      name,
      phone,
      email,
      address,
      time,
      id,
      product_name,
      product_price,
      product_color_code,
      product_color_name,
      size,
      qty,
    ],
    (err, result) => {
      if (err) {
        console.log(err.stack);
      }
      let id = result.insertId;
      axios
        .post("https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime", {
          data: {
            partner_key:
              "partner_PHgswvYEk4QY6oy3n8X3CwiQCVQmv91ZcFoD5VrkGFXo8N7BFiLUxzeG",
            prime: prime,
            amount: "1",
            merchant_id: "AppWorksSchool_CTBC",
            details: "Some item",
            cardholder: {
              phone_number: "+886923456789",
              name: "王小明",
              email: "LittleMing@Wang.com",
              zip_code: "100",
              address: "台北市天龍區芝麻街1號1樓",
              national_id: "A123456789",
            },
          },
          headers: {
            "Content-type": "application/json",
            "x-api-key":
              "partner_PHgswvYEk4QY6oy3n8X3CwiQCVQmv91ZcFoD5VrkGFXo8N7BFiLUxzeG",
          },
        })
        .then((response) => {
          db.query(
            'update user_orders SET payment_status = "paid" where iduser_orders = ?',
            [id]
          );
          console.log(response);
          res.send({
            message: "刷卡成功!",
            總金額: total,
            purchase_id: id,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  );
});

module.exports = router;
