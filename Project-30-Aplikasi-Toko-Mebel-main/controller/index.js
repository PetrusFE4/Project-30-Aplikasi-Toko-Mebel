const admin = require('./adminController');
const user = require('./userController');
const home = require('./homeController');
const register = require('./registerController');
const login = require('./loginController');
const profile = require('./profileController');
const product = require('./productController');
const cart = require('./cartController');
const category = require('./categoryController');
const order = require('./orderController');
const order_item = require('./order_itemController');
const product_comment = require('./product_commentController');
const product_rating = require('./product_ratingController');

module.exports ={
	user,
	admin,
    register,
    login,
	home,
	profile,
    cart,
    category,
    product,
    order,
    order_item,
    product_comment,
    product_rating
};