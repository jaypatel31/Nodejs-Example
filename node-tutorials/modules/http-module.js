const http = require('http');
const fs = require('fs');
const path = require('path');

const app = http.createServer((req,res)=>{

    

    let fileName = (req.url === "/") ? "index.html" : req.url;

    let contentType = "text/html"

    let ext = path.extname(fileName)
    if(!ext){
        fileName += ".html"
    }

    switch(ext){
        case '.css':
            contentType = "text/css";
            break;
        case '.js':
            contentType = "text/js";
            break;
        default:
            contentType = "text/html";
    }

    fs.readFile(path.join(__dirname,'public',fileName),'utf-8',(err, content)=>{
        if(err){
            fs.readFile(path.join(__dirname,'public','404.html'),(err,data)=>{
                if(err){
                    res.writeHead(500);
                    return res.end('Error')
                }
                else{
                    res.writeHead(404,{
                        'Content-Type': contentType
                    })
    
                    return res.end(data)
                }
                
            })
        }
        else{
            res.writeHead(200,{
                'Content-Type': contentType
            })
    
            res.end(content);
        }
        
    })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}...`)
})