const express = require("express");

const cartController = require("../controllers/cart.controller");
const router = express.Router();

/**
 * @route POST api/blogs
 * @description Create a new cart
 * @access Login required
 */

router.post(
  "/",
  // authMiddleware.loginRequired,
  // validators.validate([body("content", "Missing content").exists().notEmpty()]),
  cartController.createNewCart
);
/**
 * @route POST api/blogs
 * @description Create a new cart
 * @access Login required
 */

router.get(
  "/:id",
  // authMiddleware.loginRequired,
  // validators.validate([body("content", "Missing content").exists().notEmpty()]),
  cartController.getSingleCart
);
module.exports = router;
