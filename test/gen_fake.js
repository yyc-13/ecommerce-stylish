// 連接 database
require("dotenv").config();

const config = require("../config/databaseConfig.js");
const db = config.connection;

function genFakeData() {
  let orderCount = Math.floor(Math.random() * 4000);
  let container = [];
  for (let x = 0; x < orderCount; x++) {
    let ranTotal = 100 + Math.floor(Math.random() * 900);
    let ranUser = Math.ceil(Math.random() * 5);

    let insert_data = {
      payment_status: "unpaid",
      prime: 0,
      shipping: 0,
      payment: 0,
      subtotal: 0,
      freight: 0,
      total: ranTotal,
      name: ranUser,
      phone: 0,
      email: 0,
      address: 0,
      time: 0,
      product_id: 0,
      product_name: 0,
      product_price: 0,
      product_color_code: 0,
      product_color_name: 0,
      size: 0,
      qty: 0,
    };
    container.push(insert_data);
  }
  console.log(container);
  db.query(
    "INSERT INTO user_orders (payment_status, prime, shipping, payment, subtotal, freight, total, name, phone, email, address, time, product_id, product_name, product_price, product_color_code, product_color_name, size, qty) VALUES ?",
    [container.map((x) => Object.values(x))],
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log("添加 fake Data 完成");
      }
    }
  );
}

genFakeData();
