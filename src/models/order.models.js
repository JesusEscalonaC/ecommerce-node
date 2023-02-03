const { Sequelize, DataTypes } = require("sequelize");
const db = require('../utils/database');

const order = db.define("orders", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    total_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = order;