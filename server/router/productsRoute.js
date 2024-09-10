import express from "express";
import Product from "../models/products.js";

const productsRoutes = express.Router();

const getProducts = async (req, res) =>{
    const products = await Product.find({});

    res.json({
        products,
        pagination:{},
    });
};

productsRoutes.route('/').get(getProducts);

export  {productsRoutes};