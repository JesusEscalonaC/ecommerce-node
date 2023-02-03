const AuthServices = require("../services/auth.service");
const transporter = require("../utils/mailer");
const CartServices = require("../services/cart.services");

const register = async (req, res) => {
  try {
    const user = req.body;
    const result = await AuthServices.register(user);
    if (result) {
      await CartServices.create(result.id)
      res.status(201).json({ message: "user created" });
      await transporter.sendMail({
        to: result.email,
        from: "jesusdescalonac@gmail.com",
        subject: "email confirmation",
        html: "<h1>bienvenido a la app de chat</h1> <p>tienes que confirmar el enlace </p>"


      })
    } else {
      res.status(400).json({ message: "something went wrong" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const login = async (req, res) => {
  try {
    const {email, password} = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ error: "Missing data", message: "Not email provided" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ error: "Missing data", message: "Not password provided" });
    }
    const result = await AuthServices.login({email, password});
    if(result.isValid){
      const {username, id, email, cart} = result.user;
      const userData = {username, userId:id, email, cart};

      const token = AuthServices.genToken(userData);

      delete userData.cart;

      userData.token = token;
      res.json(userData);
      console.log(result.user);
    }else{
      res.status(400).json({message: "user not found"})
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};
module.exports = {
  register,
  login
};
