const mongoose = require('mongoose')
const connectDatabase = async()=>{
    try
    {
        await mongoose.connect('mongodb+srv://sandeepgunde1:yrKo1jarhK3rHl8n@cluster0.6c6gbqj.mongodb.net/')
    }
    catch(err)
    {
        console.log("Connection Failed"+err);
    }
}
connectDatabase();
const userSchema = mongoose.Schema({
    'username':{required:true,type:String},
    'firstName':{required:true,type:String},
    'lastName':{required:true,type:String},
    'password':{required:true,type:String},
})

const User = mongoose.model('Users',userSchema)

module.exports= {
    User
}