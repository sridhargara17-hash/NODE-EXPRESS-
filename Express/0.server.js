const mongoose = require('mongoose')
const dotenv = require('dotenv');
// process.on('uncaughtException', (err) => {
//   console.log(err.name, err.message)
//   server.close(() => {
//     process.exit(1)
//   })
// })
dotenv.config({ path: './config.env' });
const app = require('./0.App');
const dns = require('dns');
const connectDB = require('./DataBase/mongoDB')
const testTour = require('./DataBase/Models/tourModels')

dns.setServers(['8.8.8.8', '1.1.1.1']);
DATABASE_URL = process.env.DATABASE
// DATABASE_URL=process.env.DATABASE_LOCAL_URL
 
// console.log(process.env)
connectDB(DATABASE_URL).then(()=>{console.log("mongoAlts connected successfully")}).catch(()=>{console.log("ERROR ")})
const port=process.env.PORT || 8000
const server =app.listen(port, () =>  
{
  console.log("server is running on port http://localhost:8000");
});

process.on('unhandledRejection',(err )=> {
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})  

// console.log(y)