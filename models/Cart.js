const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = Schema(
  {
    productId: { type: Array, required: true },
    qty: { type: Number, default: 1 },
    price: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
    totalPrice: { type: Number, required: true },
  },

  { timestamps: true }
);

// productSchema.plugin(require("./plugins/isDeletedFalse"));

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
