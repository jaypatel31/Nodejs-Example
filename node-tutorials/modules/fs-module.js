const fs  = require('fs');
const path = require('path');

//Make dir

// fs.mkdir(path.join(__dirname,'test'),(err)=>{
//     if(err){
//         console.log({msg:err.message});
//         return
//     }
//     console.log('Folder Created Successfully')
// });

//Create a file

// fs.writeFile(path.join(__dirname,'test','test.txt'),
// 'Hello Node', (err)=>{
//     if(err){
//        throw err
//     }

//     fs.appendFile(path.join(__dirname,'test','test.txt'),
//     '\nMore Data',(err)=>{
//         if(err){
//             throw err
//          }

//          console.log('Data Added');
//     })

//     console.log('File Created')
// })

//Read File

fs.readFile(path.join(__dirname,'test','test.txt'),'utf-8',
(err, data) =>{
    if(err){
        throw err;
    }
    console.log(data);
})