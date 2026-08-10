const http=require("http")
const url = require("url");

const app=http.createServer((req,res)=>{
    if(req.url==="/"){
        console.log("hiii")
    }
    else if(req.url==="/home"){
        res.end("hello from node server")
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