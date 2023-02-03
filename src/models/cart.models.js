const { Sequelize, DataTypes } = require("sequelize");
const db = require('../utils/database');

const Cart = db.define("carts", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    total_price: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Cart;