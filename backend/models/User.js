const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }

});

const User = mongoose.model('user',userSchema);
// User.createIndexes(); // cannot insert duplicate values as unique is true for email so only unique emails are required
module.exports = User;