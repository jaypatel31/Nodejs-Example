import Product from "../models/product.js"

export const getAllProductsStatic = async (req,res)=>{
    const products = await Product.find({name:""});
    res.status(200).json({products,nbHits:products.length})
}

export const getAllProducts = async (req,res)=>{
    const {featured,company,name} = req.query
    const queryObject = {}

    if(featured){
        queryObject.featured = (featured==="true") ? true : false;
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = {$regex:name,$options:'i'};
    }
    
    const products = await Product.find(queryObject)

    res.status(200).json({products,nbHits:products.length})
}