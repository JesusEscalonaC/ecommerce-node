// todo lo relacionado a nuestra aplicacion con express:
const express = require('express');
const cors = require('cors'); //para origenes cruzados
const morgan = require('morgan')
const db = require('./utils/database');
const initModels = require('./models/initModels');
const authRoutes = require('./routes/auth.routes');
const productsRouter = require('./routes/products.routes')
const app = express();
const path = require("path");
const carRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'))
app.use(express.static(path.join(__dirname, 'public')));

initModels();

db.authenticate()
  .then(() => console.log("Base de datos autenticada"))
  .catch((error) => console.log(error));

db.sync({alter: true})
  .then(()=>console.log("base de datos sincronizada"))
  .catch((error)=> console.log(error));
  



app.get('/', (req, res) => {
  res.json({ message: "Welcome to my server" });
});

app.use('/auth', authRoutes)
app.use('/products', productsRouter);
app.use('/cart', carRoutes);
app.use('/order', orderRoutes);
module.exports = app;
