const jwt = require('jsonwebtoken'); // imported JSON Web Token
require('dotenv').config() // To import .env.local files If .env.local file present dotenv will override .env

const JWT_SECRET = "sanket@123";
const fetchuser = (req,res,next)=>{

    // Get the user from the JWT token and id to req object
    const token = req.header('auth-token'); // Getting token from header
    if(!token){
        res.status(401).send({error : "Please authenticate using a valid token"});
    }

    try {
        const data = jwt.verify(token,JWT_SECRET); // Verifying the registered and requested user
        req.user = data.user;
    
        // Next will call the next function in this case it will call the async function in ROUTE 3 in auth.js
        next();

    } catch (error) {
        res.status(401).send({error : "Please authenticate using a valid token"})
    }

}

module.exports = fetchuser;