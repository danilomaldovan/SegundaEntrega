import express from 'express';
import productManager from './managers/product.manager.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const ProductManager = new productManager('./products.json');

/*------------------------------------- - --------------------------*/

app.get('/products', async(req, res)=>{
try {
    const products = await ProductManager.getproducts();
    res.status(200).json(products);
} catch (error) {
    res.status(404).json({message: error.message});
}
});

app.get('/products/:idUser', async(req, res)=>{
    try {
        const { idProduct } = req.params;
        const product = ProductManager.getProductById(Number(idProduct));
        if(product){
            res.json(product)
        }else{
            res.status(404).json({message:'not found'});
        }
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

app.post('/products', async(req, res)=>{
try {
    //console.log(req.body);
    //const user = req.body
    const { title, description, price, thumbnail, stock } = req.body;
    const product = {
        title,
        description,
        price,
        thumbnail,
        stock
    }
    const newProduct = await productManager.createProducts(product);
    res.json(newProduct)
} catch (error) {
    res.status(404).json({message: error.message});
}
});

app.put('/products/:idProduct', async(req, res)=>{
    try {
        const product = req.body;
        const { idProduct } = req.params;
        const idNumber = parseInt(idProduct)
        const productExist = await productManager.getproductsById(idNumber);
        if(productExist){
            await productManager.updateUser(product, idNumber);
            res.json({message:`User id: ${idNumber} updated}`});
        }else{
            res.status(400).json({message:`User id: ${idNumber} not found`}); 
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete('/products/:idProduct', async(req, res)=>{
    try {
        const { idProduct } = req.params;
        const idNumber = parseInt(idProduct);
        const productExist = await productManager.getProductsById(idNumber);
        if(productExist){
            await productManager.deleteUser(idNumber);
            res.status(200).json({message: `user ${idNumber} delete ok`});
        }else{
            res.json({message: `user ${idNumber} not found`});
        }
    } catch(error) {
        res.status(500).json({message: error.message})
    }
});

app.listen(8080, ()=>{
    console.log('server.ok on port 8080');
})