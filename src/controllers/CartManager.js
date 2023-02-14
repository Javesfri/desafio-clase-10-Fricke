import fs from "fs";

class Cart {
  constructor() {
    this.id;
    this.products = [];
  }
}

export class CartManager {
  constructor(path) {
    this.path = path;
  }
  static numCount = 1;

  async addCart() {
    const content = await fs.promises.readFile(this.path, "utf-8");
    const arrayCart = JSON.parse(content);
    const cart = {
      id: CartManager.setId(),
      products: [],
    };
    arrayCart.push(cart);
    await fs.promises.writeFile(this.path, JSON.stringify(arrayCart));
    return "Carrito Creado";
  }

  async getProductsFromCart(id) {
    const content = await fs.promises.readFile(this.path, "utf-8");
    const carts = JSON.parse(content);
    const cartSelected = carts.find((cartt) => cartt.id === id);
    if (cartSelected !== undefined) {
      return cartSelected.products;
    }
    return "Carrito Inexistente";
  }

  async addProductToCart(cartId, productId, ) {
    const content = await fs.promises.readFile(this.path, "utf-8");
    const arrayCart = JSON.parse(content);
    const cartIndex=arrayCart.findIndex(cart => cart.id===cartId)
    if(cartIndex !== -1){
       const prodIndex = arrayCart[cartIndex].products.findIndex( prod => prod.product === productId)
       if(prodIndex !== -1){
        arrayCart[cartIndex].products[prodIndex].quantity+=1;
       }
       else{
        arrayCart[cartIndex].products.push({product: productId, quantity: 1,})
       }
       await fs.promises.writeFile(this.path, JSON.stringify(arrayCart));
       return("Producto Actualizado / agregado en el carrito")
    }

    else{
        return("Carrito No Encotrado")
    }
  }

  static setId() {
    CartManager.numCount += 1;
    return CartManager.numCount;
  }
}
