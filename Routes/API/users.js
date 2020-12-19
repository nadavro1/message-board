const express= require('express');
const route = express.Router();
const {check, validationResult}=require('express-validator');
const User=require('../../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config= require('config');

//user register
route.post('/',
[
    check('name','Name is required').not().isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password','Please enter password with 6 or more characters').isLength({min:6})
],
async (req,res)=>{
    const errors= validationResult(req);//check all the validation above
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {name, email, password,level}= req.body;
    try {
        let user= await User.findOne({email});//check if user already exists
        if (user) {
            return res.status(400).json({errors: [{msg: "User already exists"}]})
        }
        user = new User({
            name,
            email,
            password,
            level
        })
        const salt= await bcrypt.genSalt(10);

        user.password= await bcrypt.hash(password, salt);//encrypt the password

        await user.save();//save the user in the db

        const payload={
            user:{
                id:user.id
            }
        }

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
//get all the users list
route.get('/',async(req,res)=>{
    try {
        const user = await User.find()
        if(!user) res.send('User not found')
        res.send(user);
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error');
    }
})

module.exports = route;