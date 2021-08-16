const router  = require('express').Router();
let {products} = require('../data');
const ErrorHandler = require('../errors/ErrorHandler');
const apiKeyMiddleware = require('../middlewares/apiKey');

router.get('/products',(req,res)=>{
    res.render('products',{
        title:'Product Page'
    })
})

router.get('/api/products',(req,res)=>{
    
    res.status(200).json({products})
})

router.post('/api/products',apiKeyMiddleware,(req,res,next)=>{

    // try{
    //     console.log(namesdd);
    // }catch(err){
    //     return next(ErrorHandler.serverError());
    // }

    const {name,price} = req.body;

    if(!name || !price){
        return next(ErrorHandler.validationError('Name and Price Fields are required'));
        // return res.status(422).json({error:"All fields are reqquired"})
        // throw new Error('All fields are required');
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