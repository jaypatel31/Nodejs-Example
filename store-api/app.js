import dotenv from "dotenv"

dotenv.config()
//async errors

import express from "express"
const app = express()

import { notFound } from "./middleware/not-found.js"
import { errorHandlerMiddleware } from "./middleware/error-handler.js"

// middleware
app.use(express.json())


// routes
app.get('/',(req,res)=>{
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products Route</a>')
})

// product Route


app.use(notFound)
app.use(errorHandlerMiddleware)


const PORT = process.env.PORT || 5000
const start = async () =>{
    try{
        //connect DB
        app.listen(PORT,()=>{
            console.log(`Server is Listening on ${PORT}`)
        })
    }catch(error){
        console.log(error)
    }
}

start()