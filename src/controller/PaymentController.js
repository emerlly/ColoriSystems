
const SaleService = require('../services/SaleService');

async function CreatePixSale (req, res){
    try {
        const payload = {...req.body};
        const sale = await SaleService.createSale(payload, req.user.id);
        res.status(201).json(sale);
    } catch (error) {
        res.status(400).json({message: 'Erro ao criar venda', error: error.message });
        
    }

}

module.exports = {
    CreatePixSale
};