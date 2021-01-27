const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const Product = require("../models/Product");
const bcrypt = require("bcryptjs");

const foodController = {};

foodController.getAllFood = catchAsync(async (req, res, next) => {
  console.log(req);

  const foods = await Product.find();

  return sendResponse(res, 200, true, { foods }, null, "");
});
foodController.getSingleFoodById = catchAsync(async (req, res, next) => {
  console.log(req.params.id);

  const singleFood = await Product.findById(req.params.id);

  return sendResponse(res, 200, true, { singleFood }, null, "");
});
module.exports = foodController;
