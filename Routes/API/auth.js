const express= require('express');
const route = express.Router();
const User= require('../../models/User');
const auth = require('../../middleware/auth');
const config= require('config');
const jwt= require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const {check, validationResult}=require('express-validator');
// route will use the app.use in the index.js file /api/auth
//post for user sig in the app
// first validation of the email and password
route.post('/',
[
    check('email','Please include a valid email').isEmail(),
    check('password','Please include a password').exists()
],
async (req,res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});//return the errors
    }

    const { email, password}= req.body;

    try {
        let user= await User.findOne({email});//tries to find the user details by the email
        if (!user) {
            return res.status(400).json({errors: [{msg: "Invalid credentials"}]})
        }
        
        const isMatch= await bcrypt.compare(password,user.password);//bcrypt the password to check if its correct to what the user entered

        if(!isMatch){
            return res.status(400).json({errors: [{msg: "Invalid credentials"}]})
        }

        const payload={
            user:{
                id:user.id
            }
        }
        //jwt sign: put the id, get the jwtsecret from the config, put expire time and token
        jwt.sign(payload,
            config.get('jwtSecret'),
            {expiresIn:36000},
            (err,token)=>{
                if (err) throw err;
                res.json({token});
            }
        )
    } catch (error) {
       console.error(error.message);
       return res.status(500).send('Server error'); 
    }
    

    
})
//get to see if user already signed in
route.get('/',auth,async(req,res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        if(!user) res.send('User not found')
        res.send(user);
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error');
    }
})

module.exports = route;