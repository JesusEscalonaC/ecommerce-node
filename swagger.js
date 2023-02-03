const swaggerJSDOC = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
require('dotenv').config();

const options = {
    apis: [
        './src/routes/auth.routes.js',
        './src/models/users.models.js',
        './src/routes/products.routes.js',
        './src/models/products.models.js',
        './src/models/product_in_cart.models.js',
        './src/routes/cart.routes.js',
        './src/routes/order.routes.js',
        './src/models/order.models.js'
        
    ],
    definition: {
        openapi: "3.0.0",
        info: {
            title: "ecommerce",
            version: "0.0.9",
            description: "API  de aplicación de ecommerce"
        }
    }
};

const swaggerSpec = swaggerJSDOC(options);

const swaggerDocs = (app, port) => {
    app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    app.use('/api/v1/docs.json', (req, res)=>{
        res.setHeader({"Content-type":  "application/json"});
        res.send(swaggerSpec);
    })

    console.log(`la documentacion está disponible en ${process.env.URL}:${port}/api/v1/docs`)
};

module.exports = swaggerDocs;