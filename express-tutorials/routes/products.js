const router  = require('express').Router();
let {products} = require('../data');

router.get('/products',(req,res)=>{
    res.render('products',{
        title:'Product Page'
    })
})

router.get('/api/products',(req,res)=>{
    
    res.status(200).json({products})
})

router.post('/api/products',(req,res)=>{
    const {name,price} = req.body;

    if(!name || !price){
        return res.status(422).json({error:"All fields are reqquired"})
    }

    const newProduct = {id:new Date().getTime().toString(),name,price}

    products.push(newProduct);
    res.status(201).json(newProduct)
})

router.delete('/api/products/:productId',(req,res)=>{
    products = products.filter(product => Number(req.params.productId) !== Number(product.id))

    res.status(200).json({status:'OK'})
})

module.exports = router;