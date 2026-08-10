const express=require("express")
const fs=require("fs")
const app=express()
const tours=JSON.parse(fs.readFileSync(`${__dirname}/assets/tours-simple.json`))
app.use(express.json())

app.get('/api/v1/tours',(req,res)=>{

res.status(200).json({
    status:"success",
    data:{
        tours
    }
})
})
app.post('/api/v1/tours',(req,res)=>{
const newId=tours[tours.length-1].id+1;
const newTour=Object.assign({id:newId},req.body)
tours.push(newTour);
fs.writeFile(`${__dirname}/assets/tours-simple.json`,JSON.stringify(tours),err=>{
res.status(201).json({
    status:'success',
    data:{
        tour:newTour
    }
})
})
})
app.listen(8000,()=>{console.log("server is running on port http://localhost:8000")})
