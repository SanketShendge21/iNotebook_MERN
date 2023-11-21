const express = require('express'); // imported express
const router  = express.Router(); //imported express router
const User = require('../models/User'); // imported mongo model of User
const { validate, ValidationError, Joi } = require('express-validation'); // imported express-validator / validation
const bcrypt = require('bcryptjs') //imported bcrypt js
const jwt = require('jsonwebtoken'); // imported JSON Web Token
const fetchuser = require('../middleware/fetchuser');

require('dotenv').config(); // To import .env.local files If .env.local file present dotenv will override .env




// Creating validation rules and also custom error messages
const createUserValidation = {
    body: Joi.object({
      name : Joi.string().min(3).required().messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 3 characters long'
      }),
      email: Joi.string().email().required().messages({
        'string.email': 'Invalid email format',
        'any.required': 'Email is required'
      }),
      password: Joi.string().min(5).regex(/[a-zA-Z0-9]{3,30}/).required().messages({
        'string.pattern.base': 'Password must be alphanumeric and at least 5 characters long',
        'string.min': 'Password must be at least 5 characters long',
        'any.required': 'Password is required'
      })
    }),
  }

  // Validation to check login of user
const loginValidation = {
    body: Joi.object({
      email: Joi.string().email().required().messages({
        'string.email': 'Invalid email format',
        'any.required': 'Email is required'
      }),
      password: Joi.string().min(5).regex(/[a-zA-Z0-9]{3,30}/).required().messages({
        'string.pattern.base': 'Password must be alphanumeric and at least 5 characters long',
        'string.min': 'Password must be at least 5 characters long',
        'any.required': 'Password is required'
      })
    }),
  }

// ROUTE 1 : Create a user using : POST req to "/api/auth/createuser". No login required
router.post('/createuser', validate(createUserValidation, {}, {}), async (req, res) => { // /createuser endpoint to create a user
    try {
        let success = false;
        // console.log(req.body);

        // const user = new User(req.body); // one of the method to store in database without validation
        // await user.save();

        // Another way to create user and store data in database
        // Check whether the user with same email exists already



        let user = await User.findOne({email : req.body.email}); //wait till it resolves the returning promise
        
        if(user){
          return res.status(400).json({success,error : "Sorry user with this email already exists"})
        }

        const salt = await bcrypt.genSalt(10); // Generating salt using in-built function genSalt 10 rounds to use and await because it returns a promise
        const secPass = await bcrypt.hash(req.body.password,salt) // Passing password and salt to generate hash password and await because it returns a promise
        user = await User.create({ // Using async await so removed then and catch  
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        const JWT_SECRET = "sanket@123";
        const data = {
          user : {
            id : user.id
          }
        }
        const authToken = jwt.sign(data,JWT_SECRET); // Used variable from local environment file
        // console.log(jwtData);
        
        // .then(user => res.json(user)).catch(err => {console.log(err)
        // res.json({error : 'Please enter a unique value for email'
        //     , message : err.message})
        // res.json({
        //   "user" : user,
        //   "Message" : "User created successfully"}); // response if user is created successfully
        // res.send("Hello"); // can send response only once if already send : Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
        
        success = true;
        res.json({success,authToken})

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});



// ROUTE 2 :  Authenticate a user using POST "api/auth/login" No login required
router.post('/login',validate(loginValidation, {}, {}), async (req,res) => {

  const {email,password} = req.body;
  let success = false;
  try {
    let user = await User.findOne({email})
    if(!user){
      return res.status(400).json({error : "Please try to login using correct credentials"});
    }

    // Comparing password with hashed password
    const passwordCompare = await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      return res.status(400).json({success,error : "Please try to login using correct credentials"});
      
    }

    // If credentails are correct  we send payload (user data)

    const data = {
      user : {
        id : user.id
      }
    }

    const JWT_SECRET = "sanket@123";
    // console.log(JWT_SECRET)
    const authToken = jwt.sign(data,JWT_SECRET);
    success = true;
    res.send({success,authToken})

  } catch (error) {
    console.log(error)
    res.status(500).send("Internal Server Error");
}
})



// ROUTE 3 :  Get logged-in user details using : POST req to "/api/auth/getuser". Login required 
router.post('/getuser', fetchuser ,async (req,res) => { // Added custom middleware and passed as second argument
  try {
    const userID = req.user.id;
    const user = await User.findById(userID).select("-password"); // using select we can select all fields of user "-password" means except password
    res.send(user);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});




// Add an error handling middleware If there are errors return bad request and the errors
router.use(function(err, req, res, next) {
  if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err);
  }
  return res.status(500).json(err)
});



module.exports = router;
