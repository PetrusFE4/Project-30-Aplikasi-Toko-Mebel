const express = require("express");
const router = express.Router();
const product_commentController = require("../controller/product_commentController");

// Endpoint untuk menambahkan komentar produk
router.post("/add-comment", product_commentController.addComment);

module.exports = router;
