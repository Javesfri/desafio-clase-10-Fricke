import express from "express";
import { __dirname, __filename } from "./path.js";
import routerProduct from "./routes/products.routes.js";
import routerCart from "./routes/carts.routes.js";

 
const app = express();
const PORT = 8080;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Routes
app.use('/static',express.static(__dirname +'/public'))
app.use("/api/products", routerProduct);
app.use("/api/carts", routerCart)



app.listen(PORT, () => {
  console.log(`Server on Port ${PORT}`);
});
