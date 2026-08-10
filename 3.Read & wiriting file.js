// Asynchronously way
const fs = require("fs")
// fs.readFile("txt/file1.txt", 'utf-8', (err, data) => {
//     fs.readFile(`txt/${data}.txt`, 'utf-8', (err, data2) => {
//         fs.readFile(`txt/${data2}`, 'utf-8', (err, data3) => {
//             fs.readFile(`txt/${data3}`, 'utf-8', (err, data4) => {
//                 console.log(data4)
//             })
//         })
//     })

// })
const data= "Hello node.jsndcdcbs world"
fs.writeFile("assists/txt/file4" ,data,'utf-8',err=>{
    console.log("file sucessfuly written")
})