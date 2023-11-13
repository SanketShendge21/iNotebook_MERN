const mongoose = require('mongoose'); //Imported mongoose
const mongoURI = "mongodb://127.0.0.1:27017/inotebook"; //connection string to database

// creating a connection function
const connectToMongo = () =>{
    mongoose.connect(mongoURI)  // takes URI 
    console.log("Connected to Mongo Successfully");
};


module.exports = connectToMongo; 