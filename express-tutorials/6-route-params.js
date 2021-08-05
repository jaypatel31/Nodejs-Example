const express = require('express');
const app = express();
const {products} = require('./data.js')

app.get('/',(req,res)=>{
    res.send('<h1>Home Page</h1><a href="api/products">Products</a>')
})

app.get('/api/products',(req,res)=>{
    const newProducts = products.map((product)=>{
        const {id, name, image} = product;
        return {id,name,image}
    })
    res.json(newProducts)
})

app.get('/api/product/:productID',(req,res)=>{
    let {productID} = req.params;
    const singalProducts = products.find((product) => product.id === Number(productID))
    if(!singalProducts){
        return res.status(404).send('Product Does not Exist')
    }
    res.json(singalProducts)
})


app.listen(5000,()=>{
    console.log(`Listening on port  5000`);
})