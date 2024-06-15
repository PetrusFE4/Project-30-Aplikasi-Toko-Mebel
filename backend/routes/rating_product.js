const express = require("express");
const router = express.Router();
const product_ratingController = require("../controller/product_ratingController");

// Endpoint untuk menambahkan rating produk
router.post("/add-rating", product_ratingController.addRating);

module.exports = router;
