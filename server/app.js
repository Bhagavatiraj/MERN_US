const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require("dotenv");


dotenv.config({path:"./config.env"})
require("./db/conn");



app.use(express.json());


// router file linked
app.use(require("./router/auth"));
const PORT =process.env.PORT;

//middlewares

const middleware =(req, res, next)=>{
    console.log("Hello from middleware!");
    next();
}

// app.get('/', (req, res) => {
//     res.send(`Hello World from Server`);
// });





app.get('/contact', (req, res) =>{
    res.send("Hello from contact us!");
});


app.get('/login', (req, res) =>{
    res.send("Hello from login!");
});


app.get('/register', (req, res) =>{
    res.send("Hello from register!");
});


// Important part bcoz by listen you make sure the server is getting started on ur pc
app.listen(PORT, () => {
    console.log(`server is running at port no ${PORT}`);
})