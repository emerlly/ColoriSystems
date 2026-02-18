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
      ref: 'product',
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
      ref: 'supplier',
      index: true
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'customer',
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
      ref: 'users',
      required: true,
      index: true
    },
    reason: {
      type: String,
      required: true,
      enum: ['compra', 'venda', 'devolução', 'correção', 'outro']
    },

    notes: {
      type: String
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'companyId',
      required: true //setado como null para permitir movimentações de estoque sem company, caso necessário, 
      // alterar para 'required: true' quando for obrigatório associar uma movimentação de estoque a um company
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

const StockMovement = mongoose.model('stockMovement', stockMovementSchema);

module.exports = StockMovement;
