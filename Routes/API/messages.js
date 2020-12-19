const express= require('express');
const route = express.Router();
const {check, validationResult}=require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Message = require('../../models/Message');

// add message to board
//first validation of the form + check token
route.post('/', [auth,[
    check('subject','Please add subject').not().isEmpty(),
    check('desc','Please add description').not().isEmpty(),
    check('desc','Description overlimit').isLength({max:200}),//200 chars hard limit
    check('phone','Please add phone').not().isEmpty(),
    check('email','Please include a valid email').isEmail()
    ]] ,async (req,res)=>{
        try {
            const errors= validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array()});
            }
            const user = await User.findById(req.user.id).select('-password');//for getting the user details
            const newMessage = new Message({
                subject:req.body.subject,
                desc:req.body.desc,
                name:user.name,
                sender: req.user.id,
                type:req.body.type,
                phone:req.body.phone,
                email:req.body.email,
            });
            const message = await newMessage.save();//saving the message on DB
            res.send(message);
        } catch (error) {
            console.log(error.message)
            res.status(500).send('Server error');
        }
    })

    //get all messages for paid users

    route.get('/all',auth,async (req,res)=>{
        try {
            const messages = await Message.find().populate('sender',['name']).sort({date:-1});//finding all the messages, -1 for descending order
            if(messages=== undefined || messages.length == 0){
                return res.status(404).json({msg:'Messages are not found'})
            }
            res.json(messages); 
        } catch (error) {
            console.log(error);
            res.status(500).send('Server error');
        }
        
    })

    //get limited messages for unpaid users
    route.get('/limited',auth,async (req,res)=>{
        try {
            const messages = await Message.find({},null,{limit:3}).populate('sender',['name']).sort({date:-1});//finding all the messages, -1 for descending order
            if(messages=== undefined || messages.length == 0){
                return res.status(404).json({msg:'Messages are not found'})
            }
            res.json(messages); 
        } catch (error) {
            console.log(error);
            res.status(500).send('Server error');
        }
        
    })

    // delete message
    route.delete('/:id',auth,async (req,res)=>{
        try {
            const message = await Message.findById(req.params.id);//find the message
            if(!message){
                return res.status(404).json({msg:'Message not found'})
            }
            await message.remove();
            res.send("Deleted message: "+ message);
        } catch (error) {
            console.log(error);
            if(error.name == "CastError"){
                return res.status(400).json({msg:"message not found"});
            }
            res.status(500).send('Server error');
        }
        
    })
    module.exports = route;