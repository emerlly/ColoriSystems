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
          ref: 'Product',
          required: true
        },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true }
      }
    ],

    totalValue: { type: Number, required: true },

    status: {
      type: String,
      enum: ['draft', 'approved', 'converted', 'cancelled'],
      default: 'draft'
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    notes: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('Quote', quoteSchema);
