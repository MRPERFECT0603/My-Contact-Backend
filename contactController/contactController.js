const asyncHandler = require("express-async-handler");
const Contact  = require("../models/contactModels")
const user = require("../models/userModel");
//@desc Get all Contacts
//@route GET /api/contacts
//@access private 

const getContact = asyncHandler(async (req ,res) => {
    const contacts = await Contact.find({ userID: req.user.id  });
    res.status(200).json(contacts);
});


//@desc Get Contacts by id
//@route GET /api/contacts/:id
//@access private 

const getContactbyid =  asyncHandler(async (req ,res) => {
    const contacts = await Contact.findById(req.params.id);
    res.status(200).json(contacts);
});


//@desc create Contact
//@route POST /api/contacts
//@access private 

const createContact =  asyncHandler(async (req ,res) => {
    console.log("THE DATA IS:",req.body);
    const{name , email , phone} = req.body;
    if(!name || !email || !phone)
    {
        res.status(400);
        throw new Error("ALL Fields Are Mandatory!");
    }
    console.log("User ID:",req.user.id);
    const contact = await Contact.create(
    {
        name,
        email,
        phone,
        userID: req.user.id
    });
    res.status(201).json(contact);
});




//@desc Update Contact
//@route Put /api/contacts/:id
//@access private 

const updateContact = asyncHandler( async  (req ,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.send(404);
        throw new Error("DATA NOT FOUND");
    }

    if(contact.userID.toString() !== req.user.id)
    {
        res.status(403);
        throw new Error ("User not allowed to update the Contacts.");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatedContact);
});



//@desc Delete Contact
//@route delete /api/contacts/:id
//@access private 

const DeleteContact =  asyncHandler(async (req ,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.send(404);
        throw new Error("DATA NOT FOUND");
    }
    if(contact.userID.toString() !== req.user.id)
    {
        res.status(403);
        throw new Error ("User not allowed to delete the Contacts.");
    }
    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact);
});




module.exports = {
    getContact, 
    getContactbyid, 
    createContact, 
    updateContact, 
    DeleteContact
};
