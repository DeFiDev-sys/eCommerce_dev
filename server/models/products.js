import mongoose from "mongoose";

const reviewScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    rating: {
      type: Number,
      require: true,
    },
    comment: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      require: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const productScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    image: {
      type: Array,
      require: true,
      default: [],
    },
    brand: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    reviews: [reviewScheme],
    rating: {
      type: Number,
      require: true,
      default: 0,
    },
    numberOfReviews: {
      type: Number,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    stock: {
      type: Number,
      require: true,
    },
    productIsNew: {
      type: Boolean,
      require: true,
    },
    stripeId: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productScheme);

export default Product;
