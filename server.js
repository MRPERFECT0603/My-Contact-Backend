const express = require("express");
const ConnectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

const app = express();

ConnectDb();

// const port = process.env.PORT || 8000;
const port = 8010;

app.use(express.json());

app.use("/api/contacts", require("./routes/contactRoute"));
app.use("/api/users", require("./routes/userRoutes"));
app.listen(port , ()=>{
    console.log(`Server has been started on the ${port}`);    
});
