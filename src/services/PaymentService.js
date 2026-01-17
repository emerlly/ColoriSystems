

class PaymentService {
    async processPayment(sale, paymentData ) {
        //logica de pagamentos e integração com gateways de pagamento

        console.log("PaymentService carregado");

        return { 
            status: 'success', 
            message: 'Payment processed successfully' 
        };

    }
}
module.exports = PaymentService;