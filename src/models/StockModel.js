const { mongoose } = require('./ConnectionModel');

const stockMovementSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['in', 'out', 'adjustment'],
      required: true
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      index: true
    },

    quantity: {
      type: Number,
      required: true
    },

    // Data efetiva da movimentação (opcional)
    movementDate: {
      type: Date,
      default: Date.now
    },

    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier',
      index: true
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      index: true
    },

    unitPrice: {
      type: Number
    },

    paymentMethod: {
      type: String
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },

    notes: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// Índices para performance de relatórios
stockMovementSchema.index({ type: 1 });
stockMovementSchema.index({ createdAt: -1 });
stockMovementSchema.index({ product: 1, createdAt: -1 });

const StockMovement = mongoose.model('StockMovement', stockMovementSchema);

module.exports = StockMovement;
