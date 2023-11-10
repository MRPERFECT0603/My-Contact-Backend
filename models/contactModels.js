const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name:{
        type: String,
        required: [true , "Please fill the name"],
    },
    email:{
        type: String,
        required: [true , "Please fill the email address"],
    },
    phone:{
        type: String,
        required: [true , "Please fill the phone No."],
    },
},  
{
    timestamps : true,
});

module.exports = mongoose.model("Contact" , contactSchema);