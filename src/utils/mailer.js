const nodemailer = require('nodemailer');

require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: "465",
    secre: true,
    auth: {
        user: "jesusdescalonac@gmail.com",
        pass: process.env.G_PASSWORD
    }
})

module.exports = transporter;