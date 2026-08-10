const http=require("http")
const url = require("url");
const fs = require("fs");
// const { dirname } = require("pathname");
// const path = require("path");
const slugify=require('slugify') 

// -----------------------------------------------------------------------------------------
const replaceTemplate=(temp,product)=>{
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);
  
  if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  return output;
    
}
const template_Overview=fs.readFileSync(`${__dirname}/template/template-overview.html`,'utf-8');
const template_card=fs.readFileSync(`${__dirname}/template/template-card.html`,'utf-8')
const template_products=fs.readFileSync(`${__dirname}/template/template-products.html`,'utf-8')
const data=fs.readFileSync(`${__dirname}/1.node-farm/data.json`,'utf-8')
const dataobj=JSON.parse(data);

// --------------------------------------------------------------------------------
const slugs= dataobj.map(el=>slugify(el.productName,{lower: true}))
console.log(slugs)
const server=http.createServer((req,res)=>{ 
 const { path, query } = url.parse(req.url, true);
  console.log(query)

    if(req.url ==="/" || req.url ==="/overview"){
     res.writeHead(200,{'content-type':'text/html'});
     const cardHtml= dataobj.map(el=>replaceTemplate(template_card,el)).join('')
       const output=template_Overview.replace('{%PRODUCT_CARDS}',cardHtml);
        res.end(output)
    }
    else if(req.url==="/card"){
        res.end(template_card)

    }
    else if(req.url==="/product"){
        const productpp = dataobj[query.id];

        res.writeHead(200,{'content-type':'text/html'});
        const output=replaceTemplate(template_products,productpp)
        res.end(output)

    }
    // else{
    //     req.end("not found")
    // }
})

server.listen(8000,()=>{
console.log("server is running at http://127.0.0.1:8000/")})