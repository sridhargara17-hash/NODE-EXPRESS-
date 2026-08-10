const fs= require('fs')
setTimeout(()=>{console.log("Timer 1 finished")},0)
setImmediate(()=>console.log("Timer 1 immmediate"))
fs.readFile("assists/test.txt",()=>{
    console.log("I/O finished");
    console.log("----------------");
    setTimeout(()=>{console.log("Timer 2 finished")},0);
    setTimeout(()=>{console.log("Timer 3 finished")},3000);
    setImmediate(()=>console.log("Timer 2 immmediate"));
    

})
console.log('hello from the top-level code')