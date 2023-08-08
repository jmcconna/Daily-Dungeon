const mongoose = require('mongoose');
require('dotenv').config()


mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})


module.exports = mongoose.connection;
