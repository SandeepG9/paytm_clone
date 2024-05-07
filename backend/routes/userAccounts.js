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



router.post('/transfer', async (req, res) => {
   const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});


module.exports = router;
