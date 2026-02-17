const { mongoose } = require('./ConnectionModel');

const saleSchema = new mongoose.Schema({

  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customer',
    required: true
  },

  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
      },
      quantity: { type: Number, required: true },
      unitPrice: { type: Number, required: true },
      totalPrice: { type: Number, required: true }
    },

  ],
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companyId',
    required: true //setado como null para permitir vendas sem company, caso necessário, 
    // alterar para 'required: true' quando for obrigatório associar uma venda a um company
  },

  totalValue: {
    type: Number,
    required: true
  },

  paymentMethod: {
    type: String,
    enum: ['cash', 'credit', 'debit', 'pix', 'transfer', 'other'],
    required: true
  },

  status: {
    type: String,
    enum: ['pending', 'paid', 'cancelled'],
    default: 'pending'
  },
  transactionId: String,

  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  quote: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'quote'
  },

  notes: String

}, { timestamps: true });



module.exports = mongoose.model('sale', saleSchema);
