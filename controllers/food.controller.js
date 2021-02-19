const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const Product = require("../models/Product");
const bcrypt = require("bcryptjs");

const foodController = {};

foodController.getAllFood = catchAsync(async (req, res, next) => {
  let { limit, ...filter } = { ...req.query };
  // console.log(req);
  console.log(req.query);

  const foods = await Product.find({ ...filter, isDeleted: false }).collation({
    locale: "en",
    strength: 2,
  });
  // .limit(limit);

  return sendResponse(res, 200, true, { foods }, null, "");
});
foodController.getSingleFoodById = catchAsync(async (req, res, next) => {
  console.log(req.params.id);

  const singleFood = await Product.findById(req.params.id);

  return sendResponse(res, 200, true, { singleFood }, null, "");
});

foodController.createNewProduct = catchAsync(async (req, res, next) => {
  let { name, price, images, category, info } = req.body;

  product = await Product.create({ name, price, images, category, info });
  return sendResponse(
    res,
    200,
    true,
    product,

    null,
    "Create product Successful"
  );
});
foodController.deleteSingleProduct = catchAsync(async (req, res, next) => {
  let id = req.params.id;
  console.log("id cua product bi delete neee", id);
  product = await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  console.log("product bi delete neeee", product);
  if (!product)
    return next(
      new AppError(
        400,
        "Product not found or User not authorized",
        "Delete Product Error"
      )
    );
  return sendResponse(res, 200, true, null, null, "Delete Product successful");
});

module.exports = foodController;
