const router  = require('express').Router();
const {products} = require('../data');

router.get('/products',(req,res)=>{
    res.render('products',{
        title:'Product Page'
    })
})

router.get('/api/products',(req,res)=>{
    
    res.status(200).json({products})
})

module.exports = router;