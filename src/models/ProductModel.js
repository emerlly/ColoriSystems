const { mongoose } = require('./ConnectionModel');

const productSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      index: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      index: true
    },

    costPrice: {
      type: Number,
      required: true,
      min: 0
    },

    salePrice: {
      type: Number,
      required: true,
      min: 0
    },

    stockQuantity: {
      type: Number,
      default: 0,
      min: 0
    },

    minStock: {
      type: Number,
      default: 0,
      min: 0
    },

    active: {
      type: Boolean,
      default: true,
      index: true
    }
  },
  { timestamps: true }
);

// Índices adicionais
productSchema.index({ name: 1 });
productSchema.index({ category: 1, active: 1 });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
