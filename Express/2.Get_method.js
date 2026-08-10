const express=require("express")
const fs=require("fs")


const app=express()
const tours=JSON.parse(fs.readFileSync(`${__dirname}/assets/tours-simple.json`))


app.get('/api/v1/tours',(req,res)=>{

res.status(200).json({
    status:"success",
    data:{
        tours
    }
})

})
app.listen(8000,()=>{console.log("server is running on port http://localhost:8000")})
