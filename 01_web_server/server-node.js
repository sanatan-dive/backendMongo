const http = require('http')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req,res)=>{
    if(req.url === '/'){
    res.statusCode = 200 //if everything is ok
    res.setHeader('Content-Type','text/plain') // set header 
    res.end("hello world")}
    else if (req.url === '/about'){
        res.statusCode = 200
        res.setHeader('Content-Type','text/plain')
        res.end("about")
    }   
    else {
        res.statusCode = 404
        res.setHeader('Content-Type','text/plain')
        res.end("404 not found")
    }

})

server.listen(port,hostname,()=>{
    console.log(`server running at http://${hostname}:${port}`)
})