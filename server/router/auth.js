const express = require('express');
const User = require('../model/userSchema');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require("../middlewares/authenticate");


router.get('/', (req, res) => {
    res.send(`Hello World from Server router.js`);
});

router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Fill the fields properly!" })
    }

    try {
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "Email already exists" });
        }

        const user = new User({ name, email, phone, work, password, cpassword });

        const userRegister = await user.save();

        if (userRegister) {
            // res.status(201).json({ message: "user registered successfully" });
            res.send(userRegister);
        }
        else {
            res.status(500).json({ error: "Failed to register" });
        }



    } catch (err) {
        console.log(err);
    }

    // console.log(req.body);
    // res.json({ message: req.body });
})


router.post("/login", async (req, res) => {
    let token;
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ error: "Fill the fields properly" })
        }

        const userLogin = await User.findOne({email:email});
        

        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);
             token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly:true
            })


            if(!isMatch){

                res.status(400).send("Error!!");
            }else{
                // res.json({message:"User signIn successfull"});
                res.send(userLogin);
                
            }
        }else{
            res.status(400).send("Error!!");
        }

    } catch (err) {
        console.log(err);
    }

    // res.json({message:"awesome"});
    // console.log(req.body);

})


router.get('/about', authenticate, (req, res) =>{
    res.send("Hello from about us!");
});

module.exports = router;