const ProductsServices = require("../services/products.services");

const getAllProducts = async(req, res) =>{
    try {
        const result = await ProductsServices.getAll();
        res.json(result)
    } catch (error) {
        res.status(400).json(error.message);
    }
}
const createProduct = async(req, res) =>{
    try {
        const body = req.body;
        const file = req.file;
        const {userId} = req.user;
        body.image_url = file.filename;
        body.user_id = userId;
        const result = await ProductsServices.create(body);
        res.status(201).json(result);
    } catch (error) {
        res.status(401).json(error.message)
    }
}
module.exports = {
    getAllProducts, 
    createProduct
}