const mongoose = require('mongoose');


module.exports= mongoose.model('Inventory',{
    productName: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    supplierName: { type: String, required: true },
    manufacturingDate: { type: Date },
    expiryDate: { type: Date },
    location: { type: String }
});


