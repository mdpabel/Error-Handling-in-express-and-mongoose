const express = require("express");
const asyncHandler = require("../middleware/async");
const Product = require("../models/product");
const router = express.Router();
const ErrorResponse = require("../util/errorResponse");

router.get(
  `/products`,
  asyncHandler(async (req, res, next) => {
    const products = await Product.find();
    res.status(200).send(products);
  })
);

router.get(
  "/products/:id",
  asyncHandler(async (req, res, next) => {
    const _id = req.params.id;

    const product = await Product.findById(_id);
    if (!product) {
      //  return res.status(404).send();
      return next(
        new ErrorResponse(`Resource not found id of ${req.params.id}`, 404)
      );
    }
    res.send(product);
  })
);

router.post(
  `/products`,
  asyncHandler(async (req, res, next) => {
    const data = req.body;
    const products = new Product(data);

    await products.save();
    // const p = await Product.insertMany(pr);
    res.status(201).json(products);
  })
);

module.exports = router;
