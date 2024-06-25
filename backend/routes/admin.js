const express = require("express");
const router = express.Router();
const path = require("path");
const adminController = require("../controller/adminController");
const multer = require("multer");
const authMiddleware = require("../middleware/auth");
const adminRole = require("../middleware/adminRole");

router.use(authMiddleware);
router.use(adminRole);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "image"); // Specify your upload directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file to avoid conflicts
  },
});
const upload = multer({ storage: storage });

// Routes untuk pengguna
router.get("/", adminController.getAllUsers);
router.delete("/", adminController.deleteUser);
router.put("/", adminController.updateUserRole);

// Routes untuk produk
router.get("/products", adminController.getAllProducts);
router.put("/products", upload.single("image"), adminController.updateProduct);
router.delete("/products", adminController.deleteProduct);
router.post("/products", upload.single("image"), adminController.createProduct);

// Routes untuk kategori
router.get("/category", adminController.getAllCategories);
router.put("/category", upload.single("image"), adminController.updateCategory);
router.delete("/category", adminController.deleteCategory);
router.post(
  "/category",
  upload.single("image"),
  adminController.createCategory
);

// Routes untuk riwayat transaksi
router.get("/", adminController.getTransactionHistory);
router.post("/transaction_history", adminController.createTransactionHistory);
router.get(
  "/transaction_history/:id",
  adminController.getTransactionHistory
);
router.put(
  "/transaction_history/:id",
  adminController.updateTransactionHistory
);
router.delete(
  "/transaction_history/:id",
  adminController.deleteTransactionHistory
);

module.exports = router;
