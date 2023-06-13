const fs = require ('fs');

class ProductManager {
    constructor(path){
        this.path = path;
    }

    async getProducts(){
        try{
            if(fs.existsSync(this.path)){
                const products = await fs.promises.readFile(this.path, 'utf-8');
                const productsjs = JSON.parse(products)
                return productsjs;
            }else{
                return []
            }
        } catch(error){
            console.log(error);
        }
    }

    async getProductById(idProduct){
        try {
            let products = await this.getProducts
            let foundProduct = products.find ((product) => product.id === idProduct);
            console.log(foundProduct);
            return foundProduct;
        } catch (error) {
            console.log(error)
        }
    }


    async addList(title, description, price, thumbnail, code, stock = 20,) {
        
        try {
            await this.getProducts();
            
            let isAllFields =(!title || !description || !price || !thumbnail || !code || !stock)
            if (!isAllFields) {
                console.log("All fields are requiered");
                return;
            }
            
            let isCodeExist = this.products.some((element) => {
                return element.code === insertedCode;
            });

            if (isCodeExist) {
                console.log("Error: Product code already exist");
                return;
            }

            if (isAllFields && !isCodeExist) {
                const product = {
                    id: this.#newId,
                    title,
                    description,
                    price,
                    thumbnail,
                    code: insertedCode,
                    stock
                }

                this.products.push(product);
                this.#getMaxId;
                await fs.promises.writeFile(this.path, JSON.stringify(this.products));
            }
                
        } catch (error) {
            console.log(error);
        }
    }

    #getMaxId(){
        let maxId = 0;
        this.products.map((product) =>{
            if(product.id > maxId) maxId = product.id;
        })
        return maxId; 
    }
    
    async updateProduct(idNumber, updated) {
        try {
            await this.getProducts();
            
            let index = this.products.findIndex((element) => {
                return element.id === idNumber;
            });
            
            if(updated.code){
                let isCodeExist = false;
                isCodeExist = this.products.some((item) => item.code === updated.code);
                if (!isCodeExist) {
                    let modifiedProducts = {
                        ...this.products[index],
                        ...updated
                    }
                    this.products[index] = modifiedProducts;
                    this.saveProducts(this.products);
            
                } else {
                    console.log("Error: Product code already exist");
                    return;
                }
            } else {
                let modifiedProducts = {
                    ...this.products[index],
                    ...updated
                }
                this.products[index] = modifiedProducts;
                this.saveProducts(this.products);
                
            }
            
        } catch (error) {
            console.log(error);
        }
    }    

    async deleteProduct(idNumber) {
        try {
            await this.getProducts();

            if(this.products.some(element => element.id === idNumber)){
                let index = this.products.findIndex((element) => {
                    return element.id === idNumber;
                });
            
                this.products.splice(index, 1);
                await fs.promises.writeFile(this.path, JSON.stringify(this.products));
                return;
            }else{
                console.log("Error: Product does not exist");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async saveProducts(elements){
        try {
            const productsJS = JSON.stringify(elements);
            await fs.promises.writeFile(this.path, productsJS);
        } catch (error) {
            console.log(error);
        }
    }
}

const Product = new ProductManager('./productsFs.json');

const test = async()=>{
    await Product.addProduct(1,'silla gamer', 'azul ecocuero','65000','https://www.laeditorial.com.ar/28754-large_default/silla-gamer-premium-home-azul-139-00439.jpg','#45');
    await Product.addProduct(2,'escritorio', 'clasico con estantes','20000','https://arcencohogar.vtexassets.com/arquivos/ids/341612-1200-1200?v=638103539103830000&width=1200&height=1200&aspect=true','#46');
    await Product.addProduct(3,'auriculares', 'Comodos y livianos con banda ajustable para mas comodidad','2000','https://medias.musimundo.com/medias/00590020-146953-146953-01-146953-01.jpg-size515?context=bWFzdGVyfGltYWdlc3w1MDg3OXxpbWFnZS9qcGVnfGg1MS9oOTYvMTA0MTA3ODA5MTc3OTAvMDA1OTAwMjAtMTQ2OTUzLTE0Njk1M18wMS0xNDY5NTNfMDEuanBnX3NpemU1MTV8ZjZjMDg1ZjNmZDY1ZDc5N2M1YzM1ZmYzN2E4YjdlZjAzYmY4ZGJkMTRkOWZhN2YzYTlkYTU5ODI3MGUxOWQ4MQ','#47');
    await Product.addProduct(4,'mouse gamer', 'luz rgb, 7 botones','5000','https://medias.musimundo.com/medias/00407030-143459-143459-01-143459-01.jpg-size515?context=bWFzdGVyfGltYWdlc3wzNTA5MnxpbWFnZS9qcGVnfGhjZS9oZGIvMTAzOTQ0NjA1MjA0NzgvMDA0MDcwMzAtMTQzNDU5LTE0MzQ1OV8wMS0xNDM0NTlfMDEuanBnX3NpemU1MTV8NGQxMjI3ZDI0MzQ4OWRjM2JlOTU0M2ZiNDBkMTc5Y2FmODVjMGFlNTYwMjY2NWVlZmM1YjA1N2Q3NmY1ZDU0Yg','#48');
    Product.addEvent(5,'telcado', 'mecanico','7000','https://http2.mlstatic.com/D_NQ_NP_789265-MLA43540912849_092020-O.jpg','#49');
    
    
    await Product.updateProduct(2, {title: 'modificado', code:'#48'});
    await Product.updateProduct(3, {title: 'modifica2', code:'#49'});

    await Product.deleteProduct(1);
}

test();;