const { mongoose } = require('./ConnectionModel');

const quoteSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Products',
          required: true
        },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true }
      }
    ],
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CompanyId',
      required: true //setado como null para permitir cotações sem company, caso necessário, 
      // alterar para 'required: true' quando for obrigatório associar uma cotação a um company
    },

    totalValue: { type: Number, required: true },

    status: {
      type: String,
      enum: ['draft', 'approved', 'converted', 'cancelled'],
      default: 'draft'
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true
    },

    notes: String
  },
  { timestamps: true }
);

const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote