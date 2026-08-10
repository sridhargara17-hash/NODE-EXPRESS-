// 👎Synchronous also called as blockimg code
//👍 Aysnchronous is also called as non-blocking code

const fs =require('fs');
// const input=fs.readFileSync("assists/2.input.txt",'utf-8');
// console.log(input)
// console.log("this blocking")

// --------------------

fs.readFile("assists/2.input.txt",'utf-8',(err,data)=>{
    console.log(data)
});
console.log("this non - blocking")

