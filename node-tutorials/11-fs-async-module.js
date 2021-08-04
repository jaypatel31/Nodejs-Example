const {readFile, writeFile} = require('fs');

console.log('start');

readFile('./content/first.txt', 'utf8' ,(err,result)=>{
    if(err){
        console.log(err);
        return;
    }
    const first = result;
    readFile('./content/second.txt','utf8',(err,result)=>{
        if(err){
            console.log(err);
            return;
        }
        const second = result;
        writeFile(
            './content/result-async.txt',
            `\nHere is the result: ${first}, ${second}`,
            {flag: 'a' },
            (err,result)=>{
                if(err){
                    console.log(err);
                    return;
                }
                console.log('Done with task');
            }
        ) 
    })
})
console.log('starting new task');