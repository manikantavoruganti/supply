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
app.use(cors({origin: 'https://supplychainmanagement.netlify.app/'}))
app.use('/api/suppliers', supplierRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/inventories', inventoryRoutes);

app.use(errorHandler);

connectDb()
.then(() => {
    console.log('db connection succeeded')
    app.listen(3000, () => console.log('server started at port 3000'));

})
.catch(err=>console.log(err));
