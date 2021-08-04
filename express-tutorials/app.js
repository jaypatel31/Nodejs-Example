const express = require('express');
const app = express();
const {products} = require('./data.js')

app.get('/',(req,res)=>{
    res.json(products)
})

app.listen(5000,()=>{
    console.log(`Listening on port  5000`);
})