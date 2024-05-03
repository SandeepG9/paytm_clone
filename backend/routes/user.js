const express = require("express");
const jwt_secret = require("../config")
const router = express.Router();
const { User } = require("../db");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const signupBody = zod.object(
    {
        username: zod.string().email(),
        firstName: zod.string(),
        lastName: zod.string(),
        password: zod.string()
    }
)
router.post("/signup",async (req,res)=>{
    const {success} = await signupBody.safeParse(req.body);
    if(!success)
    {
        return res.status(401).json({msg:"Invalid credentials"});
    }
    try{

        const dataFound = await User.findOne({username:req.body.username});
        if(dataFound)
        {
            res.status(404).json({msg:"Account Already Exist with this email"});
        }
        else
        {
            const user_data = new User({
                username:req.body.username,
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                password:req.body.password
            })

            const user_data_saved = await user_data.save();
            const token = jwt.sign({username:req.body.username},jwt_secret);

            res.status(201).json({
            msg:"Logged in Succesfully",
            token:token
            }) 
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json(
            {msg:"Signup Failed",
            error:err}
        )
    }
})

router.post("/signin",async(req,res)=>{
    try{

        const exist = await User.findOne({username:req.body.username});
        if(exist)
        {
            res.status(200).json({msg:"User found"});
        }
        res.status(400).json("user not found");
       
    }
    catch(err)
    {
        res.status(501).json({msg:"cannot signin"});
    }
})

module.exports = router;