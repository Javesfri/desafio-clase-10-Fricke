import fs from 'fs'
//Creo el archivo si no existe







//clase de product
class Product{
    constructor(title,description,price,thumbnail,code,stock){
        this.title=title;
        this.description=description;
        this.price=price;
        this.status=true;
        this.thumbnail=thumbnail;
        this.code=code;
        this.stock=stock;
        this.id;
    }
}




//clase del productManager
export class ProductManager{
    constructor(path){
        this.products=[]
        this.path=path;

    }
    static numCount=1;

    async addProduct(product){
        const content=await fs.promises.readFile(this.path, "utf-8")
        this.products = JSON.parse(content)
        if(this.products.some(productt => productt.code===product.code)){
            console.log("Error: El codigo de  product Ya Existe")
        }
        else{
            product.status=true;
            product.id=ProductManager.setId();
            this.products.push(product);
            await fs.promises.writeFile(this.path,JSON.stringify(this.products))

            return("Producto Creado!")
        }
    }

    async getProducts(){
        const content=await fs.promises.readFile(this.path,'utf-8')
        this.products=JSON.parse(content)
        return this.products;
    }

    async getProductById(id){
        const content=await fs.promises.readFile(this.path,'utf-8')
        this.products=JSON.parse(content)
       const product = this.products.find(elemento => elemento.id===id) ;
       if(product !== undefined){
        return product
       }
       return ("producto no encontrado");
    }

    async updateProduct(id,{title,description,price,thumbnail,code,stock}){
        const content=await fs.promises.readFile(this.path,'utf-8')
        this.products=JSON.parse(content)
        if(this.products.some(product =>
            product.id===id
        )){
            let index=this.products.findIndex(product => product.id===id)
            this.products[index].title=title
            this.products[index].description=description
            this.products[index].price=price
            this.products[index].thumbnail=thumbnail
            this.products[index].code=code
            this.products[index].stock=stock
            await fs.promises.writeFile(this.path,JSON.stringify(this.products))
            return("Producto Actualizado")
        }else
            console.log("product No encontrado")
    }

    async deleteProduct(id){
        const content=await fs.promises.readFile(this.path,'utf-8')
        this.products=JSON.parse(content)
        if(this.products.some(product =>
            product.id===id
        )){
            let newArray=this.products.filter(item => item.id !==id)
            
            await fs.promises.writeFile(this.path,JSON.stringify(newArray))
            return("Producto Eliminado")
        }else
            return ("producto No encontrado");
    }

    static setId(){
        ProductManager.numCount+=1;
        return(ProductManager.numCount)
    }

}


 








