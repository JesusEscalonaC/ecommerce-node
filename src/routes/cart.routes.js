const { Router } = require("express");
const { addProductToCart, getProducts, deleteProductToCart } = require("../controllers/cart.controller");
const authMiddleware = require("../middlewares/auth.middleware");


const router = Router();

router.post("/", authMiddleware, addProductToCart);
router.get("/", authMiddleware, getProducts);
router.delete("/:productInCartId", authMiddleware, deleteProductToCart)
module.exports = router;

/**
 * @openapi
 * /cart:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get the products that the user has
 *     tags:
 *       - Cart
 *     responses:
 *       200:
 *         description: Product response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Satisfactory response
 *       400:
 *           description: Error response for database
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: There is an error in the request
 * paths:
 *   /cart/{productInCartId}:
 *     delete:
 *       tags: [Cart]
 *       security:
 *         - bearerAuth: []
 *       summary: delete product in cart
 *       parameters:
 *         - in: path
 *           name: productInCartId
 *           required: true
 *           schema:
 *             type: integer
 *             example: 1
 *       responses:
 *         400:
 *           definition: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: There is an error in the request
 *   /cart:
 *     post:
 *       summary: add a product to the cart
 *       tags: [Cart]
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/addProducts"
 *       responses:
 *         201:
 *           description: gotten products
 *           content:
 *             application/json:
 *               schemas:
 *         401:
 *           description: error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: cant add the products to the cart
 */