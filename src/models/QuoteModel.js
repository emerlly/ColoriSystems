const { mongoose } = require('./ConnectionModel');

const quoteSchema = new mongoose.Schema(
  {
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
      }
    ],
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'companyId',
      required: true //setado como null para permitir cotações sem company, caso necessário, 
      // alterar para 'required: true' quando for obrigatório associar uma cotação a um company
    },

    totalValue: { type: Number, required: true },

    status: {
      type: String,
      enum: ['rascunho', 'aprovado', 'convertido', 'cancelado'],
      default: 'rascunho'
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },

    notes: String
  },
  { timestamps: true }
);

const Quote = mongoose.model('quote', quoteSchema);

module.exports = Quote