import express from "express";
import Product from "../models/products.js";

const productsRoutes = express.Router();

const getProducts = async (req, res) => {
  const page = parseInt(req.params.page); //1,2 or 3
  const perPage = parseInt(req.params.perPage); //10, or 15 items per page

  const products = await Product.find({});

  if (page && perPage) {
    const totalPage = Math.ceil(products.length / perPage); //2.6 === 3
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedProducts = products.slice(startIndex, endIndex);
    res.json({ products: paginatedProducts, pagination: { currentPage: page, totalPage } });
  } else {
    res.json({
      products,
      pagination: {},
    });
  }
};

const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
};

productsRoutes.route("/:page/:perPage").get(getProducts);
productsRoutes.route("/").get(getProducts);
productsRoutes.route("/:id").get(getProduct);

export { productsRoutes };
