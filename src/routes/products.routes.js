const { Router } = require('express');
const multer = require('multer');
const {v4:uuid} = require("uuid");
const path = require("path");
const {
    getAllProducts,
    createProduct
} = require("../controllers/products.controller");

const authMiddleware = require('../middlewares/auth.middleware');

const storage = multer.diskStorage({
    destination: path.resolve( './src/public/images'),
    filename: (req, file, cb) => {
        // cb(null, file.originalname);
        cb(null, uuid() + path.extname(file.originalname).toLowerCase());
    }
});
    
const uploadImage = multer({
    storage,
    limits: {fileSize: 1000000}, // un millon es un mega, se define en bites
    fileFilter: (req, file, cb) => {
        var filetypes = /jpeg|jpg|png|gif/;
        var mimetype = filetypes.test(file.mimetype);
        var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: File upload only supports the following filetypes - " + filetypes);
    },
}).single('image');


const router = Router();

router.get("/", getAllProducts);
router.post("/", authMiddleware, uploadImage, createProduct)
module.exports = router;


/**
 * @openapi
 * /products:
 *   get:
 *     summary: get all the products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: gotten products
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/getAllProducts"
 *       400:
 *         description: error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: error to get the products
 * paths:
 *   /products:
 *     post:
 *       security:
 *         - bearerAuth: []
 *       tags: [Products]
 *       summary: Create a new product
 *       requestBody:
 *         require: true
 *         description: It is necessary to fill in all fields
 *         content:
 *           multipart/form-data:
 *             schema:
 *               $ref: "#/components/schemas/createProduct"
 *       responses:
 *         201:
 *           description: A status and message about the status of the request will be sent
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: everything went well
 *         400:
 *           description: error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: error to get the products
 */