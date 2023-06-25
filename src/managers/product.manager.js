import fs from 'fs'

export default class productManager{
    constructor(path){
        this.path = path
    }

    async createProducts(prod){
        try {
            const products = {
                id: await this.#getMaxId() + 1,
                ...prod
            }
            const productFile = await this.getProducts();
            productFile.push(user);
            await fs.promises.writeFile(this.path, JSON.stringify(productFile));
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    async #getMaxId(){
        let maxId = 0;
        const product = await this.getProducts();
        users.map((prod) => {
            if(product.id > maxId) maxId = product.id;
        });
        return maxId;
    }




    async getProducts(){
        try {
            if(fs.existsSync(this.path)){
                const products = await fs.promises.readFile(this.path, 'utf-8');
                const productsJS = JSON.parse(products);
                return productsJS
            }else{
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getProductsById(id){
        try {
            const productFile = await this.getProducts();
            const products = productFile.find((p) => p.id === id);
            if(products) return products
            else return false;
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(prod, id){
        try {
            const productFile = await this.getproducts();
            const index = productFile.findIndex(prod => prod.id === id);
            if (index === -1){
                throw new Error ('ID not found');
            }else{
                productFile[index] = {...prod, id }
            }
            await fs.promises.writeFile(this.path, JSON.stringify(productFile));
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id){
        try {
            const productFile = await this.getProducts();
            if(productFile.length > 0 ){
                const newArray = productFile.filter(prod => prod.id !== id);
                await fs.promises.writeFile(this.path, JSON.stringify(newArray));
            }else{
                throw new Error('User not found');
            }
        } catch (error) {
            console.log(error);
        }
    }
}
