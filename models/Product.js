const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    images: [String],
    category: { type: String, required: true },
    info: { type: String },
    isDeleted: { type: Boolean, default: false },
  },

  { timestamps: true }
);

// productSchema.plugin(require("./plugins/isDeletedFalse"));

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
