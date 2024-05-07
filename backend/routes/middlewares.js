const jwt = require("jsonwebtoken");
const jwt_secret = require("../config");
function checkSigninCredentials(req,res,next)
{
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    if(!authHeader && !authHeader.startsWith('Bearer '))
    {
        res.status(403).json({message:""});
    }
    else
    {
        try
        {
            
            const decode = jwt.verify(token,jwt_secret);
            if(decode)
            {
                req.userId = decode;
                next();
            }
        }
        catch(err)
        {
            res.send(403).json({message:"cannot login"});
        }
    }
    const verifying_token = authHeader.split(' ')[1];

    
}


module.exports = checkSigninCredentials;