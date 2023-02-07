import express from 'express'
import fs from 'fs'
const app = express();
const PORT =4000
const products =JSON.parse(await fs.promises.readFile("./product.txt","utf-8"))
app.get('/products',async (req,res)=>{
    let {limit} = req.query
    /*const products =JSON.parse(await fs.promises.readFile("./product.txt","utf-8"))*/
    if(limit){
       let productsLimit  = products.slice(0,parseInt(limit))
        res.send(JSON.stringify(productsLimit))
    }else{
        res.send(JSON.stringify(products))

    }
})

app.get('/products/:pid',async (req,res)=>{
    const pid=req.params.pid;
    /*const products =JSON.parse(await fs.promises.readFile("./product.txt","utf-8"))*/
    let productId=products.find(prod=> prod.id ===parseInt(pid))
    if(productId){
        res.send(JSON.stringify(productId))
    }
    else{
        res.send("EL PRoducto no existe")
    }
    
})

app.listen(PORT, () =>{
    console.log(`Server on Port ${PORT}`)
})

