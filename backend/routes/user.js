const express = require("express");
const jwt_secret = require("../config")
const router = express.Router();
const { User, Account } = require("../db");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const checkSigninCredentials = require("./middlewares");
const signupBody = zod.object(
    {
        username: zod.string().email(),
        firstName: zod.string(),
        lastName: zod.string(),
        password: zod.string()
    }
)

const signinBody = zod.object(
    {
        username: zod.string().email().min(1),
        password: zod.string()
    }
)
router.post("/signup",async (req,res)=>{
    const {success} = await signupBody.safeParse(req.body);
    if(!success)
    {
        return res.status(401).json({message:"Invalid credentials"});
    }
    try{

        const dataFound = await User.findOne({username:req.body.username});
        if(dataFound)
        {
            res.status(404).json({message:"Email already taken / Incorrect inputs"});
        }
        else
        {
            const user_data = new User({
                username:req.body.username,
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                password:req.body.password
            })
            const user_datas = await user_data.save();
            const user_idData = user_datas.id;
            const newAccount = new Account({
                userId:user_idData,
                balance: 1+Math.random()*10000
            })

            const saveAccount = await newAccount.save();

            res.status(201).json({
            messsage:"User Created Successfully"
            }) 
        }
    }
    catch(err)
    {
        res.status(500).json(
            {msg:"Signup Failed",
            error:err}
        )
    }
})

router.post("/signin",async(req,res)=>{
    try
    {
        const sucess =await signinBody.parse(req.body);
        if(!sucess)
        {
            res.status(401).json({message:"Invalid cred"});
        }
        else
        {
           const usernameExist =await User.findOne({username:req.body.username,password:req.body.password});
           if(usernameExist.password===req.body.password && usernameExist.username === req.body.username)
            {
                const token = jwt.sign({userId:usernameExist._id},jwt_secret);
                res.status(201).json({message:"Logged In successfully",token:token});
            }
            else
            {
                res.status(404).json({messgae:"Invalid Credentials"});
            }
        }
    }
    catch(err)
    {
        res.status(404).json({message:"Invalid Credentials"});
    }
})


router.post("/updateUser",checkSigninCredentials,(req,res)=>{
    user_name = req.body.username;
    user_firstname = req.body.firstName;
    user_lastname = req.body.lastName;
    user_password = req.body.password;

    User.findOneAndUpdate(
            {username:user_name},
            {$set:{firstName:user_firstname,lastName:user_lastname,password:user_password,}} 
    )
    .then(
        updateUser=>{
            if(updateUser)
            {
                res.status(200).json({messgae:"User Updated Succesfully"});
            }
            else
            {
                res.status(404).json({messgae:"User not Found"});
            }

        }
    ).catch(err=>{
        res.status(500).json({message:"Internal Server Error"});
    })

})


router.get("/bulk",checkSigninCredentials, async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


module.exports = router;