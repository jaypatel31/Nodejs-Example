const authorize = (req,res,next) =>{
    const {user} = req.query;
    if(user === "jay"){
        req.user = {name:'jay',id:49}
        next()
    }
    else{
        res.status(401).send('Unauthorize')
    }
}

module.exports = {authorize}