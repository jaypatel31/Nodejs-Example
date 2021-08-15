const express = require('express');
const path = require('path');
const app = express()
const mainRouter = require('./routes/index');
const productRouter = require('./routes/products');

app.set('view engine','ejs');

app.use(express.static('views'));
app.use(express.json());
app.use('/',mainRouter)
app.use('/',productRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}...`)
})