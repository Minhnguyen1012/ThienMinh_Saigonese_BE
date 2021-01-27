const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },

    content: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = reviewSchema;
