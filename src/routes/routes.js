const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controllers/productController");
const { createUser } = require("../controllers/userController");
const router = express.Router();

router.route("/products").get(getAllProducts).post(createProduct);
router
  .route("/products/:id")
  .get(getProductById)
  .put(updateProductById)
  .delete(deleteProductById);
module.exports = router;
router.route("/register").post(createUser);
