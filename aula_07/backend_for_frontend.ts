import { ProductsController } from "./controllers";
import { MyApi } from "./types";

let app = new MyApi

app.get('/mobile/products', (_req, _res) => { 
    const pc = new ProductsController();
    const all_products = pc.GetAllWithFields(['name', 'identifier']);
    return JSON.stringify(all_products);
});

app.get('/browser/products', (_req, _res) => { 
    const pc = new ProductsController();
    const all_products = pc.GetAll();
    return JSON.stringify(all_products);
});