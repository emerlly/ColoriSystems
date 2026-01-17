

const mercadopago = require('mercadopago');

class MPaymentService {
    async createPixPayment(amount, email, externalReference) {
        const paymentData = {
            transaction_amount: amount,
            description: 'Pagamento via Pix',
            payment_method_id: 'pix',
            payer: {
                email: email
            },
            external_reference: externalReference
        }

        const response = await mercadopago.payment.create(paymentData, {
            Headers: {
                'X-Idempotency-Key': externalReference
            }
        })
        return response.body;
    }
}

module.exports = new MPaymentService();