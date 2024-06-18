const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");
const authMiddleware = require("../middleware/auth")

router.use(authMiddleware)

router.post("/checkout", orderController.orderProduct);

module.exports = router;
