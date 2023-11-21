const mongoose = require('mongoose');

module.exports = mongoose.model('Product', {
    name: {type: String, required:true},
    description: {type: String,},
    company: {type: String, required:true},
    price: {type: Number, required:true},
    quantity: {type: Number, required:true},
    
})