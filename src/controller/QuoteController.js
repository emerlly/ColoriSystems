const QuoteService = require('../services/QuoteService');

class QuoteController {

  async createQuote(req, res) {
    try {
      const quote = await QuoteService.createQuote(req.body, req.user._id);
      res.status(201).json(quote);
    } catch (error) {
      res.status(400).json({ message: 'Erro ao criar orçamento', error: error.message });
    }
  }

  async getAllQuotes(req, res) {
    try {
      const data = await QuoteService.getAllQuotes();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar orçamentos', error: error.message });
    }
  }

  async approveQuote(req, res) {
    try {
      const data = await QuoteService.approveQuote(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async convertQuote(req, res) {
    try {
      const sale = await QuoteService.convertQuoteToSale(req.params.id, req.user._id);
      res.json({ message: 'Orçamento convertido em venda com sucesso', sale });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  async cancelQuote(req, res) {
    try {
      const data = await QuoteService.cancelQuote(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

}

module.exports = new QuoteController();
