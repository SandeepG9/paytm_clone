const express = require("express");
const app = express()
app.use(express.json());
const mainRouter = require("./routes/index")
const cors = require("cors")

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow specified HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specified headers
    next();
  });
app.use("/api/v1/",mainRouter)
app.use(cors());

app.listen(3000);