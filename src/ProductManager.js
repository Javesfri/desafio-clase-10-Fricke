const fs = require('fs');
//Creo el archivo si no existe
const initialize= () =>{
    if(!fs.existsSync('./product.txt')){
        fs.writeFileSync('./product.txt',"[]")
    }
}






//clase de product
class Product{
    constructor(title,description,price,thumbnail,code,stock){
        this.title=title;
        this.description=description;
        this.price=price;
        this.thumbnail=thumbnail;
        this.code=code;
        this.stock=stock;
        this.id;
    }
}




//clase del productManager
class ProductManager{
    constructor(path){
        this.products=[]
        this.path=path;

    }
    static numCount=1;

    newProduct(title,description,price,thumbnail,code,stock){
        return( new Product(title,description,price,thumbnail,code,stock))
    }
    async addProduct(product){
        const content=await fs.promises.readFile(this.path, "utf-8")
        this.products = JSON.parse(content)
        if(this.products.some(productt => productt.code===product.code)){
            console.log("Error: El codigo de  product Ya Existe")
        }
        else{  
            product.id=ProductManager.setId();
            this.products.push(product);
            await fs.promises.writeFile(this.path,JSON.stringify(this.products))
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
       product !== undefined ? console.log(product) : console.log("Not Found");

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
            
        }else
            console.log("product No encontrado")
    }

    static setId(){
        ProductManager.numCount++;
        let id=ProductManager.numCount;
        return(id)
    }

}

initialize()
const productManager1 = new ProductManager("./product.txt")
element1=productManager1.newProduct("product prueba1","Este es un product prueba",200,"Sin imagen","abc12223",25);
element2=productManager1.newProduct("product prueba2","Este es un product prueba",300,"Sin imagen","asdfasdf",25);
element3=productManager1.newProduct("product prueba3","Este es un product prueba",400,"Sin imagen","abcasdfasd1235",25);
element4=productManager1.newProduct("product prueba4","Este es un product prueba",500,"Sin imagen","cascas",25);
element5=productManager1.newProduct("product prueba5","Este es un product prueba",600,"Sin imagen","hghdfghh",25);


elementoUpdate={...element1}
elementoUpdate.title="product De PRueba 2"
const test= async()=>{
    await productManager1.addProduct(element1)
    await productManager1.addProduct(element2)
    await productManager1.addProduct(element3)
    await productManager1.addProduct(element4)
    await productManager1.addProduct(element5)
   console.log (await productManager1.getProducts())
   


}
test();








