const http = require('http');

const server = http.createServer((req,res)=>{
    if(req.url === '/'){
        res.end('Welcome to our Homepage.')
    }
    else if(req.url === '/about'){
        res.end('Here is our Short History.')
    }
    else{
        res.end(`
            <h1>Oops!</h1>
            <p>Looks like you are Lost</p>
            <a href="/">back home</a>
        `)
    }
    
})

server.listen(5000)