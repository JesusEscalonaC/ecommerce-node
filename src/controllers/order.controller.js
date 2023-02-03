const CartServices = require("../services/cart.services");
const OrderServices = require("../services/order.services");

const addProductsToOrder = async(req, res) =>{
    try {
        const {userId, cart} = req.user;
        const cartFound = await CartServices.getProducts(cart.id)
        if(cartFound){
            const carResult = await CartServices.emptyingCart(cartFound.products, cartFound, userId);
            carResult != false ? 
                res.json({message: "successfully added"}) :
                res.status(400).json({message: "error"})
        }else{
            res.status(400).json({message: "products not found"})
        }
    } catch (error) {
        res.status(400).json(error.message)
    }
};
const getOrderProducts = async(req, res) => {
    try {
        const {userId} = req.user;

        const result = await OrderServices.find(userId);
        res.json(result);
    } catch (error) {
        res.status(400).json(error.message)
    }
}
module.exports = {
    addProductsToOrder,
    getOrderProducts
}