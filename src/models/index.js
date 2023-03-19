// Initialising database connection to mongodb at localhost using mongoose

const mongoose = require('mongoose');
const { mongodbconnectionurl } = require('../config/urlconfigs')

const connectDB = async () => {
    try{
        // mongodb connection string
        const connection = await mongoose.connect(mongodbconnectionurl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log(`MongoDB connected : ${connection.connection.host}`);
    }catch(err){
        console.log(err);
        throw err;
    }
}

module.exports = connectDB

