const express = require("express");
const jwt_secret = require("../config")
const router = express.Router();
const { User } = require("../db");
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

            const user_data_saved = await user_data.save();
            const token = jwt.sign({username:req.body.username},jwt_secret);

            res.status(201).json({
            messsage:"User Created Successfully",
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
        if(!exist && !decode)
        {
            res.status(400).json("user not found");  
        }
        else
        {
            res.status(201).json("You are logged In");
        }
    }
    catch(err)
    {
        res.status(441).json({message:"Error while Login"});
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

// router.post("/bulk",async(req,res)=>{
//         let find_name = req.query.filter;
//         console.log(find_name);
//         // const userExist = await User.findOne($or:[ {'_id':objId}, {'name':param}, {'nickname':param} ]);
//         const docs = await User.find( { $or:[ {'firstname':find_name} ]}, 
//         function(err,docs){
//             if(!err) res.send(docs);
//         });
// })

router.get("/bulk", async (req, res) => {
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