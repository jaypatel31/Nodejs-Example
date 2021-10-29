import mongoose from "mongoose"

const storeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"product name must be provided"]
    },
    price:{
        type:Number,
        required:[true,"product price name must be provided"]
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:4.5,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    company:{
        type:String,
        enum:{
            values:['ikea','liddy','caressa','marcos'],
            message:'{VALUE} is not supported'
        }
        // enum:['ikea','liddy','caressa','marcos'],
    }
})

const Product = mongoose.model("Product",storeSchema)

export default Product