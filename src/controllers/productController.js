const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const product = await Product.create({ name, price, description });
    res.json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };

  exports.getProductById = async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findByPk(productId);
      if (!product) {
        res.status(404).send('Product not found');
      } else {
        res.json(product);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };

  exports.updateProductById = async (req, res) => {
    try {
      const productId = req.params.id;
      const { name, price, description } = req.body;
      const product = await Product.findByPk(productId);
      if (!product) {
        res.status(404).send('Product not found');
      } else {
        product.name = name;
        product.price = price;
        product.description = description;
        await product.save();
        res.json({ message: 'Product updated successfully', product });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };

  exports.deleteProductById = async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findByPk(productId);
      if (!product) {
        res.status(404).send('Product not found');
      } else {
        await product.destroy();
        res.send('Product deleted successfully');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };