const express = require("express");
const app = express()
app.use(express.json());
const mainRouter = require("./routes/index")
const cors = require("cors")

app.use("/api/v1/",mainRouter)
app.use(cors());

app.listen(3000);