const socket = io()

const botonSubmit= document.getElementById("botonSubmit");

const tableProduct=document.getElementById("tableProduct");


let newProduct={}

botonSubmit.addEventListener("click",(e)=>{
    e.preventDefault();
    const productName = document.getElementById("productName").value
    const productDescription = document.getElementById("productDescription").value
    const productPrice = document.getElementById("productPrice").value
    const productCode = document.getElementById("productCode").value
    const productStock = document.getElementById("productStock").value
    if(productName.trim().length>0&& productName.trim().length> 0 && productDescription.trim().length> 0 && productPrice.trim().length>0 && productCode.trim().length>0 && productStock.trim().length>0 ){
        newProduct={
            title:productName,
            description:productDescription,
            price: productPrice,
            thumbnail:"Sin Imagen",
            code: productCode,
            stock:productStock
        }
        socket.emit("producto",newProduct)
    }
    else{
        alert("Complete todos los campos")
    }
})



socket.on("productos", arrayProducts =>{
    tableProduct.innerHTML = `<th>Producto</th>
    <th>Descripcion</th>
    <th>Precio</th>
    <th>Code</th>
    <th>Stock</th>`
    arrayProducts.forEach(prod =>{
        tableProduct.innerHTML += `<tr><td>${prod.title}</td><td>${prod.description}</td><td>${prod.price}</td><td>${prod.code}</td><td>${prod.stock}</td></tr>`
    })
})






