const mongoose = require('mongoose');

module.exports= mongoose.model('Order', {
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    customerName: { type: String, required: true },
    phoneNo: { type: String, required: true },
    address: { type: String, required: true },
    orderDate: { type: Date, default: Date.now },
    orderStatus: { type: String, required: true },
   paymentStatus: { type: Boolean, default: false }
});


