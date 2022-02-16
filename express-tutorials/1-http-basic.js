const http = require('http');
const {readFileSync} = require('fs');

// get all files
const homePage = readFileSync('./navbar-app/index.html');
const homeStyles = readFileSync('./navbar-app/styles.css');
const homeImage = readFileSync('./navbar-app/logo.svg');
const homeLogic = readFileSync('./navbar-app/browser-app.js');

const server = http.createServer((req,res)=>{
    const url = req.url;
    //Home Page
    if(url === "/"){
        res.writeHead(200,{'content-type':'text/html'})
        res.write(homePage)
        res.end()
    }
    //About Page
    else if(url === "/about"){
        res.writeHead(200,{'content-type':'text/html'})
        res.write('<h1>About Page</h1>')
        res.end()
    }
    //styles
    else if(url === "/logo.svg"){
        res.writeHead(200,{'content-type':'image/svg+xml'})
        res.write(homeImage)
        res.end()
    }
    //Logic
    else if(url === "/browser-app.js"){
        res.writeHead(200,{'content-type':'text/js'})
        res.write(homeLogic)
        res.end()
    }
    //styles
    else if(url === "/styles.css"){
        res.writeHead(200,{'content-type':'text/css'})
        res.write(homeStyles)
        res.end()
    }
    //404
    else{
        res.writeHead(404,{'content-type':'text/html'})
        res.write('<h1>Not Found</h1>')
        res.end()
    }
})

server.listen(5000)