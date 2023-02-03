const Users = require("./users.models");
const Cart = require("./cart.models");
const Order = require("./order.models");
const ProductsInCart = require("./product_in_cart.models");
const ProductsInOrder = require("./product_in_order.models");
const Products = require("./products.models");

const initModels = () =>{
    // Users;
    Users.hasOne(Cart, {as: "cart", foreignKey: "user_id"});
    Cart.belongsTo(Users, {as: "user", foreignKey: "user_id"});

    Users.hasOne(Order, {as: "orders", foreignKey: "user_id"});
    Order.belongsTo(Users, {as: "users", foreignKey: "user_id"});

    Cart.hasMany(ProductsInCart, {as: "products", foreignKey: "cart_id"});
    ProductsInCart.belongsTo(Cart, {as: "cart", foreignKey: "cart_id"});

    Products.hasMany(ProductsInCart, {as: "cart", foreignKey: "product_id"});
    ProductsInCart.belongsTo(Products, {as: "product", foreignKey: "product_id"});

    Order.hasMany(ProductsInOrder, {as: "products", foreignKey: "order_id"});
    ProductsInOrder.belongsTo(Order, {as: "order", foreignKey: "order_id"});

    Products.hasMany(ProductsInOrder, {as: "orders", foreignKey: "product_id"});
    ProductsInOrder.belongsTo(Products, {as: "product", foreignKey: "product_id"});


}

module.exports = initModels;