import dotenv from "dotenv"

dotenv.config()

import { connectDB } from "./db/connect.js"
import Product from "./models/product.js"

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const data = require("./products.json");

const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany();
        await Product.create(data)
        console.log('Sucess')
        process.exit(0)
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

start()