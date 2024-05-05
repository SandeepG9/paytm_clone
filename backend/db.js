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

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);

module.exports = {
	Account
}

module.exports= {
    User
}