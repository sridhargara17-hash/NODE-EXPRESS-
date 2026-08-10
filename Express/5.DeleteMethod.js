const express=require("express")
const fs=require("fs")
const app=express()
const tours=JSON.parse(fs.readFileSync(`${__dirname}/assets/tours-simple.json`))
app.use(express.json())

app.delete('/api/v1/tours/:id',(req,res)=>{
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status:"fail",
            message:'Invaild'
        })
    }

res.status(204).json({
    status:'sucess',
    data:{
        tour:null
    }
})
})








app.listen(8000,()=>{console.log("server is running on port http://localhost:8000")})
