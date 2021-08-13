const express = require('express');
const path = require('path');
const app = express()

app.set('view engine','ejs');

app.use(express.static('views'))

// app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.render('index',{
        title:"My Home Page"
    });
})

app.get('/about',(req,res)=>{
    res.render('about', {
        title:"About Page"
    });
})

app.get('/download',(req,res)=>{
    res.download(path.resolve(__dirname) + "/public/logo.svg")
})


const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}...`)
})