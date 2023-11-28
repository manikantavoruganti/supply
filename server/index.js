const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//local imports
const connectDb = require('./db.js');
const supplierRoutes = require('./controllers/supplier_controller');
const productRoutes = require('./controllers/product_controller');
const orderRoutes = require('./controllers/order_controller');
const inventoryRoutes = require('./controllers/inventory_controller');
const { errorHandler } = require('./middlewares');
const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors({origin: 'https://main--supplychainmanagement.netlify.app/'}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,Authorization"
    );
    next();
})
app.use('/api/suppliers', supplierRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/inventories', inventoryRoutes);

app.use(errorHandler);

connectDb()
.then(() => {
    console.log('db connection succeeded')
     const port = process.env.PORT || 3000;

    app.listen(port, () => console.log(`Server started at port ${port}`));

    // app.listen(3000, () => console.log('server started at port 3000'));

})
.catch(err=>console.log(err));
