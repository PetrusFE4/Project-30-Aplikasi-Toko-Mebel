var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

var usersRouter = require("./routes/users");
var cartRouter = require("./routes/cart");
var productRouter = require("./routes/product");
var categoryRouter = require("./routes/category");
var profileRouter = require("./routes/profile");
var orderRouter = require("./routes/order");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/cart", cartRouter);
app.use("/products", productRouter);
app.use("/category", categoryRouter);
app.use("/profile", profileRouter);
app.use("/order", orderRouter);

module.exports = app;
