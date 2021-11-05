const jwt = require('jsonwebtoken')
const CustomApiError = require('../errors/custom-error')

const authemticationMiddleware = async (req,res,next) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new CustomApiError('No token Provided',401)
    }
    const token = authHeader.split(" ")[1]
    let decode;
    try{
        decode = jwt.verify(token,process.env.JWT_SECRET)
        const {id,username} = decode;
        req.user = {id,username}
        next()
    }catch(error){
        throw new CustomApiError('Invalid token',401)
    }

}

module.exports = authemticationMiddleware