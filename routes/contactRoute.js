const express = require("express");
const router = express.Router();
const {getContact , getContactbyid , createContact , updateContact , DeleteContact} = require("../contactController/contactController");
const ValidateToken = require("../middleware/validationTokenHandler");


router.use(ValidateToken);
router.route("/").get(getContact).post(createContact);
router.route("/:id").get(getContactbyid).put(updateContact).delete(DeleteContact);

module.exports = router;