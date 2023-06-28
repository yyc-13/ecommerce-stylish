require("dotenv").config();
const express = require("express");
const router = express.Router();

const multer = require("multer");

// 用於 sendFile 的路徑
const path = require("path");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));

// 連接 database
const config = require("../config/databaseConfig.js");
const db = config.connection;

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine }); // middleware

const multipleUpload = upload.fields([
  { name: "campaign_image", maxCount: 1 },
  { name: "other_images", maxCount: 5 },
]); // for multiple files, name should be the same as the name in <input> tag
// const multipleUpload = upload.fields([
//   { name: 'campaign_imgage', maxCount: 1 },
// ]) // for multiple files, name should be the same as the name in <input> tag
router
  .route("/campaigns")
  .post(multipleUpload, (req, res) => {
    console.log(req.body.title);
    console.log(req.body.campaign_text);
    console.log(req.files.campaign_image[0].path);
    const title = req.body.title;
    const campaign_text = req.body.campaign_text;
    const image_path = req.files.campaign_image[0].path;
    db.query(
      "INSERT INTO campaign_products (title, campaign_text, image_path) VALUES (?,?,?)",
      [title, campaign_text, image_path],
      (err, result) => {
        if (err) {
          console.log(err.stack);
        }
        console.log("campaign generated successfully.");
      }
    );
    res.sendFile(path.join(__dirname, "../public/admin/campaign.html"));
  })

  .get((req, res) => {
    const sql = "select * from campaign_products";
    let output = {};
    let campaginData = [];
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err.stack);
      }
      for (let i = 0; i < result.length; i++) {
        campaginData.push({
          product_id: result[i].id,
          picture: result[i].image_path,
          story: result[i].campaign_text,
        });
      }
      output.data = campaginData;
      res.send(output);
    });
  });

module.exports = router;
