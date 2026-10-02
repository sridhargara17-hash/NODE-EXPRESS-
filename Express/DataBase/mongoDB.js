const mongoose=require('mongoose')
const connectDB = async (url) => {
  await  mongoose.connect(url).then(
   () => {
  console.log("connection succesfully")
}
)
}
module.exports=connectDB