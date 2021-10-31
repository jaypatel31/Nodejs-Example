import Product from "../models/product.js"

export const getAllProductsStatic = async (req,res)=>{
    const products = await Product.find({name:""});
    res.status(200).json({products,nbHits:products.length})
}

export const getAllProducts = async (req,res)=>{
    const {featured,company,name,sort,fields, numericFilters } = req.query
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
    if(numericFilters){
        const operatorMap = {
            '>':"$gt",
            ">=":"$gte",
            "=":"$eq",
            "<":"lt",
            "<=":"lte",
        }

        const regEx = /\b(>|>=|=|<|<=)\b/g
        let filters =numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`)
        const options = ['price','rating'];
        filters = filters.split(",").forEach(item=>{
            const [name,op,val] = item.split('-')
            if(options.includes(name)){
                queryObject[name] = {[op]:Number(val)}
            }
        })

    }
    
    
    let result = Product.find(queryObject)

    if(sort){
        result = result.sort(sort.replace(/,/g," ")) 
    }
    else{
        result = result.sort('createdAt')
    }
    if(fields){
        result = result.select(fields.replace(/,/g," "))
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    const products = await result.limit(limit).skip((page-1)*limit);

    res.status(200).json({products,nbHits:products.length})
}