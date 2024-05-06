const express = require("express");
const checkSigninCredentials = require("./middlewares");
const { User, Account } = require("../db");
const router = express.Router();

router.post("/balance", checkSigninCredentials, async (req, res) => {
    try {
        const username = req.userId.username;
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const data_found = await Account.findOne({userId:user._id});
        console.log(data_found.balance);
        res.status(201).json(data_found.balance);
    }
    catch(err)
    {
        res.send("data not found");
    }
});



router.post("/transfer",checkSigninCredentials,async(req,res)=>{
    try
    {
        const username = req.userId.username;
        const dataFound = await User.findOne({username:username});
        const dataId = dataFound._id;
        const accoundData = await Account.findOne({userId:dataId})
        const account_balance = accoundData.balance
        const to = req.body.to;
        const amount = req.body.amount;

        let balanceExist;
        if(account_balance>=amount)
        {   
            // accoundData.balance  = accoundData.balance-amount;
            console.log(to);
            // await accoundData.save();
        }
        else
        {
            
            res.status(404).json("Insufficeint Balance");
        }







        res.status(201).json("data found");
    }
    catch(err)
    {
        res.status(404).json("Transfer failed");
    }
})

module.exports = router;
