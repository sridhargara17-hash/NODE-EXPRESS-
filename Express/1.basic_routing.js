import express from "express"
const app=express()
app.get('/',(req,res)=>{
res.status(200).json({"message":"helllo"}) 
})
app.listen(8000,()=>{console.log("server is running on port http://localhost:8000")})
