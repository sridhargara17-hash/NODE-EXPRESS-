const http=require("http")
const url = require("url");
const fs = require("fs");
const { dirname } = require("path");

// this top level code its runs onecs starting of server
// -----------------------------------------------------------------------------------------------------------------
    const userData= fs.readFileSync(`${__dirname}/assists/txt/api.txt`,'utf-8')
// -----------------------------------------------------------------------------------------------------
// bottom level  code it runs every time in sync
// ----------------------------------------------------------------------------------------------------------
const app=http.createServer((req,res)=>{
    if(req.url==="/"){
    }
    else if(req.url==="/home"){
        res.end("hello from node server")
    }
    else if(req.url==="/api"){
        res.writeHead(200,{'content-type':'application/json'})
             res.end(userData)
    }
    
    else{
        res.writeHead(404,{
            "content-type":"text/html",
            "my-own-header":"hello"  
        })
        res.end("page not found") 
    }

})
app.listen(8000,()=>{
    console.log("server is running at http://127.0.0.1:8000/")
})