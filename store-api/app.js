import dotenv from "dotenv"

dotenv.config()

import "express-async-errors"

//async errors

import express from "express"
const app = express()

import { notFound } from "./middleware/not-found.js"
import { errorHandlerMiddleware } from "./middleware/error-handler.js"
import { connectDB } from "./db/connect.js"
import router from "./routes/products.js"

// middleware
app.use(express.json())


// routes
app.get('/',(req,res)=>{
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products Route</a>')
})

app.use('/api/v1/products',router)

// product Route


app.use(notFound)
app.use(errorHandlerMiddleware)


const PORT = process.env.PORT || 5000
const start = async () =>{
    try{
        //connect DB
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT,()=>{
            console.log(`Server is Listening on ${PORT}`)
        })
    }catch(error){
        console.log(error)
    }
}

start()