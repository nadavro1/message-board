const jwt= require('jsonwebtoken');
const config = require('config');

module.exports= (req,res,next)=>{
    const token = req.header('x-auth-token');//get the token that is sent in the header

    if (!token){
       return res.status(401).json({msg: 'Token not found'});
    }
    
    try {
        const decoded= jwt.verify(token,config.get('jwtSecret'));//verify the token
        req.user=decoded.user//get the user details
        next();
    } catch (error) {
        return res.status(401).send("Invalid token");//send error it the token is invaild
    }
}