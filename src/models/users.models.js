const db = require('../utils/database');
const { DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');

const Users = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(20),
        // allowNull: false
    },
    email: {
        type: DataTypes.STRING(30),
        unique: true,
        allowNull: false,
        validate:{
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isConfirmed: {
        type: DataTypes.BOOLEAN,
        field: "is_confirmed",
        defaultValue: false
    },
},
{
        hooks:{
            beforeCreate: (user, options) =>{
                const {password} = user;
                const hash = bcrypt.hashSync(password, 10);
                user.password = hash;
            },
        },
    },
)

module.exports = Users;

/**
 * @openapi
 * components:
 *   schema:
 *     register:
 *       type: object
 *       properties:
 *         firstname:
 *           type: string
 *           example: Jesus
 *         lastname:
 *           type: string
 *           example: Escalona
 *         email:
 *           type: string
 *           example: jesus11escalona@gmail.com
 *         phone:
 *           type: string
 *           example: 9999999999
 *         password:
 *           type: string
 *           example: 1234
 *     login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: jesus@gmail.com
 *         password:
 *           type: string
 *           example: 1234
 *     loginResponse:
 *       type: object
 *       properties:
 *         firstname:
 *           type: string
 *           example: Jesus
 *         lastname:
 *           type: string
 *           example: Escalona
 *         id:
 *           type: int
 *           example: 2
 *         email:
 *           type: string
 *           example: jesus@gmail.com
 *         token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
