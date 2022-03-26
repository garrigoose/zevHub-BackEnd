const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const products = require('./data/products');
const Product = require('../backend/models/productModel');
const connectDB = require('./config/db');

const port = process.env.PORT || 8003;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// temporary seed data routes
app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const product = products[req.params.id];
  //   const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Server frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server started on port ${port}`.rainbow.bold)
);
