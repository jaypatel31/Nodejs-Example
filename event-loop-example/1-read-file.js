const {readFile} = require('fs');

console.log("started First Task");

readFile("./content/first.txt",'utf8',(err,result)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log(result);
    console.log('completed First task');
})

console.log('starting next task');