const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

const bcrypt = require("bcryptjs");

const cartController = {};

cartController.getAllProductInCart = catchAsync(async (req, res, next) => {
  console.log(req);

  const carts = await Product.findOne({});

  return sendResponse(res, 200, true, { carts }, null, "");
});

cartController.createNewCart = catchAsync(async (req, res, next) => {
  const { content } = req.body;
  const idArray = content.map((el) => el._id);
  const cart = await Cart.create({
    productId: idArray,
  });
  return sendResponse(
    res,
    200,
    true,
    { cart },
    null,
    "Create new cart successful"
  );
});

cartController.getSingleCart = catchAsync(async (req, res, next) => {
  let cart = await Cart.findById(req.params.id);
  if (!cart)
    return next(new AppError(404, "cart not found", "Get Single cart Error"));
  cart = cart.toJSON();

  // const fullDetail = cart.productId.map((el) => Product.findById(el));

  return sendResponse(res, 200, true, cart, null, null);
});

module.exports = cartController;
