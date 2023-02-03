const { Router } = require('express');
const {register, login} = require('../controllers/auth.controller');

const router = Router();

router.post('/register', register);
router.post('/login', login)

module.exports = router;

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: create a new user into application
 *     tags: [Auth]
 *     requestBody:
 *       description: Required fields to create a new user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/register'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user created
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: validation error
 * /auth/login:
 *   post:
 *     summary: Login an existing user into the app
 *     tags: [Auth]
 *     requestBody:
 *       description: Required fields to login a existing user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schema/login"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schema/loginResponse"
 *       400:
 *         description: not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user not found / something wrong / not password or email provided
 */