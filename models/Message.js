const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    
    subject:{
        type:String,
        required:true
    },
    desc: {
      type: String,
      required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    type:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    date: {
      type: Date,
      default: Date.now
    }
  });
  
  
  module.exports = Message = mongoose.model('Message', MessageSchema);