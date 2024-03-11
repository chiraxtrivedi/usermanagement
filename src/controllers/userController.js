const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, username, hashedPassword });
    res.json({ message: "User Register Successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

// exports.getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.findAll();
//     res.json(products);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// };

// exports.getProductById = async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const product = await Product.findByPk(productId);
//     if (!product) {
//       res.status(404).send("Product not found");
//     } else {
//       res.json(product);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// };

// exports.updateProductById = async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const { name, price, description } = req.body;
//     const product = await Product.findByPk(productId);
//     if (!product) {
//       res.status(404).send("Product not found");
//     } else {
//       product.name = name;
//       product.price = price;
//       product.description = description;
//       await product.save();
//       res.json({ message: "Product updated successfully", product });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// };

exports.deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await user.findByPk(userId);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      await product.destroy();
      res.send("User deleted successfully");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
