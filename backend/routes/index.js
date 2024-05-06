const express = require("express")
const userRouter = require("./user");
const userAccounts = require("./userAccounts");
const router = express.Router();
const app = express();

router.use("/users",userRouter);
router.use("/accounts",userAccounts);
module.exports = router;