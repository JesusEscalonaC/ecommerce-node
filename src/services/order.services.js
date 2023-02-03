const order = require("../models/order.models");
const Products = require("../models/products.models");
const ProductInOrder = require("../models/product_in_order.models");
const Users = require("../models/users.models");



class OrderServices{
    static async addProducts(body){
        try {
            const result = await ProductInOrder.create(body);
            return result
        } catch (error) {
            throw error;
        }
    }
   static async create(body){
        try {
            const result = order.create(body);
            return result
        } catch (error) {
            throw error;
        }
   }
   static async find(id){
    try {
        const result = await Users.findByPk(id, {
            include: {
                model: order,
                as: "orders",
                include: {
                    model: ProductInOrder,
                    as: "products",
                    include: {
                        model: Products,
                        as: "product"
                    }
                }
            }
        });
        return result;
    } catch (error) {
         throw error;
    }
  }

};

module.exports = OrderServices;