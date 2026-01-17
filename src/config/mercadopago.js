
const mercadopago = require('mercadopago');

mercadopago.configurations.setAccessToken(process.env.MERCADOPAGO_ACCESS_TOKEN);

module.exports = mercadopago;