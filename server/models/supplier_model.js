const mongoose = require('mongoose');

module.exports = mongoose.model('Supplier', {
    name: {type: String},
    contactPerson: {type: String},
    phone_No: {type: String},
    address:{type: String},
    productSupplied: {type: Array},
    
})