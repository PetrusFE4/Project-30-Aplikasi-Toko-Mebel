const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const authMiddleware = require("../middleware/auth");
const adminRole = require("../middleware/adminRole");

// Middleware untuk semua rute admin
router.use(authMiddleware);
router.use(adminRole);

// Routes untuk pengguna
router.get("/", adminController.getAllUsers);
router.delete("/", adminController.deleteUser);
router.put("/", adminController.updateUserRole);

// Routes untuk produk
router.get("/products", adminController.getAllProducts);
router.put("/products", adminController.updateProduct);
router.delete("/products", adminController.deleteProduct);
router.post("/products", adminController.createProduct);

// Routes untuk kategori
router.get("/category", adminController.getAllCategories);
router.put("/category", adminController.updateCategory);
router.delete("/category", adminController.deleteCategory);
router.post("/category", adminController.createCategory);

// Routes untuk riwayat transaksi
router.get("/", adminController.getTransactionHistory);

module.exports = router;
