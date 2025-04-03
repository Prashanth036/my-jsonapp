import api from "../api/axios"

class Products{
    static getFirstPageProducts(){
        return api.get(`/products?limit=20`)
    }
    static addProducts(){
        return api.post("")
    }
    static getProducts(ids){
        return api.get(`/products?limit=20&skip=${ids}`)
    }
}

export default Products

