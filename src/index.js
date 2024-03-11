const express = require('express');
const sequelize = require('./database/db');
const productRoutes = require('./routes/routes');

const app = express();
const PORT = 5001;

sequelize.sync().then(() => {
  console.log('Database synchronized');
});

app.use(express.json());

app.use(productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});