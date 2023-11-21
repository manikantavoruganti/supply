const mongoose = require('mongoose');

const dbUri = 'mongodb+srv://admin:SupplyPassword@supply.ekb3k9g.mongodb.net/SupplyChain_db?retryWrites=true&w=majority';

mongoose.connect(dbUri);

module.exports = () => {
    return mongoose.connect(dbUri)

};