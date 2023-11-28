const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Local imports
const connectDb = require('./db.js');
const supplierRoutes = require('./controllers/supplier_controller');
const productRoutes = require('./controllers/product_controller');
const orderRoutes = require('./controllers/order_controller');
const inventoryRoutes = require('./controllers/inventory_controller');
const { errorHandler } = require('./middlewares');

const app = express();

// Middleware for parsing JSON
app.use(bodyParser.json());

// CORS configuration
app.use(cors());

// Additional CORS headers to handle preflight requests
app.options('*', cors());

// Routes
app.use('/api/suppliers', supplierRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/inventories', inventoryRoutes);

// Error handling middleware
app.use(errorHandler);

// Database connection
connectDb()
  .then(() => {
    console.log('DB connection succeeded');
    const port = process.env.PORT || 3000;

    app.listen(port, () => console.log(`Server started at port ${port}`));
  })
  .catch(err => console.log(err));
