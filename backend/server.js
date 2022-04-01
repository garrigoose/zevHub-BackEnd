const path = require('path');
const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const products = require('./data/products');
const Product = require('../backend/models/productModel');
const connectDB = require('./config/db');

const port = process.env.PORT || 8003;

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes.js'));

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Server frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(
        __dirname,
        '../../zevHub-FrontEnd',
        'zevhub-frontend',
        'public',
        'index.html'
      )
    )
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(errorHandler);
app.use(notFound);

app.listen(port, () =>
  console.log(`Server started on port ${port}`.rainbow.bold)
);
