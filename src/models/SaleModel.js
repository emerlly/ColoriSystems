const { mongoose } = require('./ConnectionModel');

const saleSchema = new mongoose.Schema({

  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },

  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: { type: Number, required: true },
      unitPrice: { type: Number, required: true },
      totalPrice: { type: Number, required: true }
    }
  ],

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
    ref: 'User',
    required: true
  },
  quote: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Quote' 
  },

  notes: String

}, { timestamps: true });



module.exports = mongoose.model('Sale', saleSchema);
