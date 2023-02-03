const Cart = require("../models/cart.models");
const Products = require("../models/products.models");
const productsInCart = require("../models/product_in_cart.models");
const OrderServices = require("./order.services");
require("dotenv").config();

class CartServices {
  static async create(userId) {
    try {
      console.log(userId);
      const result = await Cart.create({ user_id: userId });
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async add(product) {
    try {
      const result = await productsInCart.create(product);
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getProducts(id) {
    try {
      const result = await Cart.findByPk(id, {
        attributes: {
          exclude: ["user_id", "createdAt", "updatedAt"],
        },
        include: {
          model: productsInCart,
          as: "products",

          include: {
            model: Products,
            as: "product",
            where: {
              status: false,
            },
            attributes: {
              exclude: ["user_id", "status", "createdAt", "updatedAt"],
            },
          },
          where: {
            status: false
          }
        },
      });

      result?.products.forEach(
        (product) =>
          (product.product.image_url =
            process.env.URLIMAGE + product.product.image_url)
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async updatePrice(price, id) {
    try {
      const result = await Cart.increment(
        { total_price: price },
        { where: { id } }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async deleteProduct(cart_id, product_id) {
    try {
      const productfound = await productsInCart.findByPk(product_id, {
        attributes: ["price", "quantity"],
      });

      if (productfound) {
        await productsInCart.destroy({ where: { id: product_id } });
        return -(productfound.price * productfound.quantity);
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }
  static async emptyingCart(products, cartFound, userId){
        try {
            const order = await OrderServices.create({
                total_price: cartFound.total_price, user_id: userId
            });
            if(order){
                await products.forEach(async product =>{
                    await productsInCart.update({status:true}, {where: {id: product.id}})
                    await OrderServices.addProducts({order_id: order.id, product_id: product.product.id, quantity: product.quantity, price: product.price})
                    await Products.increment({availableQty: - product.quantity}, {where: {id: product.product.id}})
                })
                const result = Cart.update({total_price: 0}, {where: {id: cartFound.id}})
            }else{
                return false;
            }

        } catch (error) {
            throw error;
        }
  }
  
}
module.exports = CartServices;
