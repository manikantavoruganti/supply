const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//local imports
const connectDb = require('./db.js');
const supplierRoutes = require('./controllers/supplier_controller');
const productRoutes = require('./controllers/product_controller')
const orderRoutes = require('./controllers/order_controller')
const inventoryRoutes = require('./controllers/inventory_controller')
const { errorHandler } = require('./middlewares')
const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors({origin: 'https://main--supplychainmanagement.netlify.app/'}))
app.use('/api/suppliers', supplierRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/inventories', inventoryRoutes);

app.use(errorHandler);

connectDb()
.then(() => {
    console.log('db connection succeeded')

    // Use process.env.PORT or a default port like 3000 if not provided
    const port = process.env.PORT;
    app.listen(port, () => console.log('server started at port ${port}'));

})
.catch(err=>console.log(err));
