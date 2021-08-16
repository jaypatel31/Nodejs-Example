const express = require('express');
const path = require('path');
const ErrorHandler = require('./errors/ErrorHandler');
const app = express()
const mainRouter = require('./routes/index');
const productRouter = require('./routes/products');

app.set('view engine','ejs');

app.use(express.static('views'));
app.use(express.json());
app.use('/',mainRouter)
app.use('/',productRouter);

app.use((req,res,next)=>{
    return res.status(404).json({message:"Page Not Found"})
});

app.use((err,req,res,next)=>{
    if(err instanceof ErrorHandler){
        return res.status(err.status).json({
            error:{
                message:err.message,
                status:err.status
            }
        });
    }
    else{
        return res.status(500).json({
            error:{
                message:err.message,
                status:err.status
            }
        })
    }
    
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}...`)
})