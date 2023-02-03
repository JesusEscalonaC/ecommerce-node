const CartServices = require("../services/cart.services");
const ProductsServices = require("../services/products.services");

const addProductToCart = async(req, res) =>{
    try {
        const body = req.body;
        const {cart} = req.user;
        body.cart_id = cart.id;
        console.log(cart)
        const product = await ProductsServices.findId(body.product_id);
        if(product){
            body.price = product.price;
            const result = await CartServices.add(body);
            await CartServices.updatePrice(result.price * result.quantity, cart.id);
            res.json(result);   
        }else{
            res.status(400).json({message: "product not found"});
        }
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const getProducts = async(req, res) =>{
    const {cart} = req.user;
    try {
        const result = await CartServices.getProducts(cart.id);
        if(result){
            return res.json(result);
        }
        res.status(400).json({message: "products not found"})
    } catch (error) {
        res.status(400).json(error.message);
    }
};

const deleteProductToCart = async (req,res) => {
    const {cart } = req.user;
    const {productInCartId} = req.params;
    
    try {
        console.log(productInCartId);
        const productPrice = await CartServices.deleteProduct(cart.id, productInCartId);
        if(productPrice) {
            const result = await CartServices.updatePrice(productPrice, cart.id);
            res.status(200).json(result);
        }else {
            res.status(400).json({message: "Product not found"})
        }
    } catch (error) {
        res.status(400).json(error.message);
    }
    };

module.exports = {
    addProductToCart,
    getProducts,
    deleteProductToCart
}