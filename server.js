const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require("morgan");

const authController = require('./controllers/auth.js')

const port = process.env.PORT ? process.env.PORT : 3000;


mongoose.connect(process.env.MONGODB_URL);




mongoose.connection.on("connected", () => {
    console.log(`connected to MongoDB ${mongoose.connection.name}`);
});

// middleware to parse url encoded date from forms 
app.use(express.urlencoded({ extended: false }));


// middleware for using http verbs such as put or delete in places where the client doesnt support it 
app.use(methodOverride("_method"));

//morgan for loggin http requests 
app.use(morgan('dev'));


// use the auth controller for any request that start with /auth 
app.use('/auth', authController);


app.get('/', (req, res) => {
    res.render("index.ejs")
})


// listen for incoming requests 
app.listen(port, async () => {
    console.log(`the express app is ready on port ${port}`);
})
