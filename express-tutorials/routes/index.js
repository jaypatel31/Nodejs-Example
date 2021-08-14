const express = require('express')
const router = express.Router();
const apiKeyMiddleware = require('../middlewares/apiKey')

router.get('/',(req,res)=>{
    res.render('index',{
        title:"My Home Page"
    });
})

router.get('/about',(req,res)=>{
    res.render('about', {
        title:"About Page"
    });
})

router.get('/download',(req,res)=>{
    res.download(path.resolve(__dirname) + "/public/logo.svg")
})

// router.get('/api/products',apiKeyMiddleware,(req,res)=>{
//     res.status(200).json([
//         {
//             id:1,
//             name:"Chrome"
//         },
//         {
//             id:2,
//             name:"Edge"
//         }
//     ])
// })

module.exports = router;