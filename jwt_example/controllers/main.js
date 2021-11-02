const jwt = require('jsonwebtoken')

const CustomApiError = require('../errors/custom-error')

const login = async (req,res) =>{
    const {username,password} = req.body

    if(username && password){
        const id = new Date().getDate()
        const token = jwt.sign({
            id,
            username
        },process.env.JWT_SECRET,{
            expiresIn:'30d'
        })
        res.status(200).json({msg:"User created",token})
    }else{
        throw new CustomApiError('Please Provide email and password',400)
    }
}

const dashboard = async (req,res) =>{
    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({msg:`Hello, John Doe`,secret:`here is your authorized data is ${luckyNumber}`})
}

module.exports = {
    login,
    dashboard
}