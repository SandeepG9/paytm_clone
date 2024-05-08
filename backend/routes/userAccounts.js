const express = require("express");
const checkSigninCredentials = require("./middlewares");
const { User, Account } = require("../db");
const { default: mongoose } = require("mongoose");
const router = express.Router();

router.post("/balance", checkSigninCredentials, async (req, res) => {
    try {
        const username = req.userId.username;
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const data_found = await Account.findOne({userId:user._id});
        res.status(201).json({"message":data_found.balance});
    }
    catch(err)
    {
        res.send("data not found");
    }
});



router.post('/transfer',checkSigninCredentials,async (req, res) => {
    const session =await mongoose.startSession();
    const {to,amount} = req.body;
    session.startTransaction();
    try
    {
        // Sender Details
        const sender_username = req.userId.username;
        const sender_username_all_data = await User.findOne({username:sender_username}).session(session);
        if(!sender_username_all_data)
        {
            res.status(404).json({message:"Sender not found"})
        }
        const sender_account_details = await Account.findOne({userId:sender_username_all_data._id}).session(session); 
        if(!sender_account_details)
        {
            res.status(404).json({message:"Sender Account details not found"});
        }
        const sender_account_balance = sender_account_details.balance;
        
        // Reciever Details
        const reciever_user = await User.findOne({username:to}).session(session);
        if(!reciever_user)
        {
            res.status(404).json({message:"reciever details not found"})
        }
        const reciver_user_Id = reciever_user._id;
        const receiver_Account_details = await Account.findOne({userId:reciver_user_Id}).session(session);
        if(!receiver_Account_details)
        {
            res.status(404).json({message:"Reciver account details not found"});
        }

        // Transfer Details
        if(sender_account_balance>=amount)
        {
            sender_account_details.balance -= amount;
            receiver_Account_details.balance += amount;
            await sender_account_details.save();
            await receiver_Account_details.save();
        }
        else
        {
            await session.abortTransaction();
            res.status(404).json({message:"Your Balance is low"});
        }

        await await session.commitTransaction();
        // sender_account_details.save();
        res.status(201).json({message:"Transfer Completed Successfully"});
    }
    catch(err)
    {   
        await session.abortTransaction();
        res.status(404).json({message:"Transfer Failed"});
    }
    finally
    {
        await session.endSession();
    }

});


module.exports = router;
