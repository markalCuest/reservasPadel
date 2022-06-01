const express = require('express');
const LoginController = require('../controlador/controlador');
const stripe = require('stripe')('sk_test_51KzcibEGBho8cDmvi7DWuBMkWqBiYoVjRgz7N0qyC6p0wr4KmFgkcLjwvwrf9es3GaasdkyfuOpTlkS9vAfWAi8T004dMUmASE');

const router = express.Router();


router.get('/login', LoginController.login);
router.post('/login', LoginController.auth);
router.get('/register', LoginController.register);
router.post('/register', LoginController.storeUser);
router.get('/home', LoginController.reserva);
router.post('/', LoginController.resPista);
router.get('/logout', LoginController.logout);


router.post('/checkout', async (req, res) => {
    const customer = await stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    });
    
    const charge = await stripe.charges.create({
        amount: "2100",
        currency: "eur",
        description: "Reserva de pista",
        customer: customer.id
    });
    req.session.loggedin = true;
    sesion = req.session.loggedin;
    req.session.name = req.body.name;
    //res.redirect("/");
});

module.exports = router;
