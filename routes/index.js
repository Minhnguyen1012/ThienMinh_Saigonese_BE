var express = require("express");
var router = express.Router();

/* GET home page. */
const userApi = require("./users.api");
router.use("/users", userApi);

const authApi = require("./auth.api");
router.use("/auth", authApi);

const foodApi = require("./food.api");
router.use("/food", foodApi);

const cartApi = require("./cart.api");
router.use("/carts", cartApi);

module.exports = router;
