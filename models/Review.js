const mongoose = require("mongoose");
const Project = require("./Project");
const Schema = mongoose.Schema;

const reviewSchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    menu: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
    content: { type: String, required: true },
    reactions: {
      love: { type: Number, default: 0 },
      thumbup: { type: Number, default: 0 },
      thumbdown: { type: Number, default: 0 },
      laugh: { type: Number, default: 0 },
      emphasize: { type: Number, default: 0 },
      question: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

reviewSchema.statics.calculateReviews = async function (projectId) {
  const reviewCount = await this.find({ project: projectId }).countDocuments();
  await Project.findByIdAndUpdate(projectId, { reviewCount: reviewCount });
};

reviewSchema.post("save", async function () {
  await this.constructor.calculateReviews(this.project);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.doc = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function (next) {
  await this.doc.constructor.calculateReviews(this.doc.project);
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
