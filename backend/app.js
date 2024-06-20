var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var cartRouter = require('./routes/cart');
var productRouter = require('./routes/product');
var categoryRouter = require('./routes/category');
var profileRouter = require('./routes/profile');
var comment_productRouter = require('./routes/comment_product');
var rating_productRouter = require('./routes/rating_product');
var transaction_historyRouter = require('./routes/transaction_history');
var orderRouter = require('./routes/order');

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/cart', cartRouter);
app.use('/products', productRouter);
app.use('/category', categoryRouter);
app.use('/profile', profileRouter);
app.use('/comment_product', comment_productRouter);
app.use('/rating_product', rating_productRouter);
app.use('/transaction_history', transaction_historyRouter);
app.use('/order', orderRouter);

module.exports = app;
