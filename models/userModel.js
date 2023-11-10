const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    username:{
        type: String,
        required: [true , "Please Enter the Username"]
    },
    email:{
        type: String,
        required: [true , "Please Enter the EmailID"],
        uniquie: [true , "EmailID already in USE"]
    },
    password:{
        type: String,
        required: [true , "Please Enter the Password"]
    },
},
{
    timestamps : true,
});



module.exports = mongoose.model("User" , userSchema);