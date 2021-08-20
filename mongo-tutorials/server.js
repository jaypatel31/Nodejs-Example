const express = require('express');
const app = express();

// DB SETUP

const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

let db;
const connectionUrl ='mongodb://ecomUser:ecom1234@localhost:27017/ecom';

(async ()=>{
    try{
        const client =await MongoClient.connect(connectionUrl)
        db = client.db('ecom')
    }catch(err){
        throw err;
    }
    
})();



app.get('/',async (req,res)=>{
    
    try{
        const result = await db.collection('products').findOne({
            name:{ $eq: 'Camera' }
        });
        res.send(result);
    }catch(err){
        throw err
    }


    // try{
    //     const result = await db.collection('products').findOne({
    //         _id: ObjectId('611f5751cabadcd5a2464bed')
    //     });
    //     res.send(result);
    // }catch(err){
    //     throw err
    // }


    // try{
    //     const result = await db.collection('products').insertOne({
    //         name:'Camera',
    //         price:400
    //     })
    //     res.send(result);
    // }catch(err){
    //     throw err
    // }


    // try{
    //     const result = await db.collection('products').find().toArray()
    //     res.send(result);
    // }catch(err){
    //     throw err
    // }
    
})

app.listen(3000,()=>{
    console.log('Listening on port 3000...')
})