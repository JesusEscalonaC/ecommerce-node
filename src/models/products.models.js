const { Sequelize, DataTypes } = require("sequelize");
const db = require('../utils/database');

const Products = db.define("products", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    availableQty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false
    },

});

module.exports = Products;

/**
 * @openapi
 * components:
 *   schemas:
 *     getAllProducts:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           id:
 *             type: integer
 *             example: 2
 *           name:
 *             type: string
 *             example: lapicero
 *           price:
 *             type: integer
 *             example: 5000
 *           availableQty:
 *             type: integer
 *             example: 2
 *           user_id:
 *             type: integer
 *             example: 1
 *           image_url:
 *             type: string
 *             example: www.image.com
 *     createProduct:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: cuaderno
 *         price:
 *           type: float
 *           example: 3000
 *         availableQty:
 *           type: integer
 *           example: 300
 *         image:
 *           type: string
 *           format: binary
 *           description: Please only send an image and image format
 */