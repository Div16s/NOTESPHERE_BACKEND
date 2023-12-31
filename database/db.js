const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const DBConnection = async()=>{
    const MONGO_URL = process.env.MONGODB_URI;
    try{
        await mongoose.connect(MONGO_URL, {useNewUrlParser: true});
        console.log("DB is connected successfully");
    }
    catch(error){
        console.log("Error while connecting to MongoDB",error.message);
    }
};

module.exports = DBConnection;