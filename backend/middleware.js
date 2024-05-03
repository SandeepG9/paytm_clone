const jwt = require("../backend/config")
const jsonwebtoken = require("jsonwebtoken")
export function authMiddleware(token)
{

        if(jsonwebtoken.verify(token,jwt))
        {
            return true;
        }
        else
        {
            return false;
        }
}