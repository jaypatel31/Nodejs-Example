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

app.get('/api/v1/query',(req,res)=>{
    const {search,limit} = req.query;
    let sortedProducts = [...products];

    if(search){
        sortedProducts = sortedProducts.filter((product)=>{
            return product.name.startsWith(search)
        })
    }
    if(limit){
        sortedProducts = sortedProducts.slice(0,Number(limit))
    }
    if(sortedProducts.length < 1){
        // res.status(200).send('no products match your search');
        return res.status(200).json({success:true,data:[]})
    }
    res.status(200).json({success:true,data:sortedProducts})
})


app.listen(5000,()=>{
    console.log(`Listening on port  5000`);
})