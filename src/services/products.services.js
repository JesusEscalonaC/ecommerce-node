const Products = require("../models/products.models");
require("dotenv").config();

class ProductsServices {
    static async getAll() {
        try {
            const result = await Products.findAll(
                // {
                // where: {status: false}}
            );
            result.forEach(product => product.image_url = process.env.URLIMAGE + product.image_url );
            return result;
        } catch (error) {
            throw error;
        }
    }
    static async create(body){
        try {
            const result = await Products.create(body);
            return result;
        } catch (error) {
            throw error;
        }
    }
    static async findId(id){
        try {
            const result = await Products.findByPk(id);
            return result;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = ProductsServices;