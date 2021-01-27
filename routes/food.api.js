const express = require("express");
const passport = require("passport");
const foodController = require("../controllers/food.controller");
const router = express.Router();

/**
 * @route GET api/food
 * @description Get all products
 * @access public
 */
router.get("/", foodController.getAllFood);

router.get("/:id", foodController.getSingleFoodById);
module.exports = router;
