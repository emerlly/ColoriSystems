const { mongoose } = require('./ConnectionModel');

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    document: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    documentType: {
      type: String,
      enum: ['CPF', 'CNPJ'],
      required: true
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Email inválido']
    },

    phone: {
      type: String,
      trim: true
    },

    address: {
      type: String,
      trim: true
    },

    active: {
      type: Boolean,
      default: true,
      index: true
    }
  },
  { timestamps: true }
);



const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;
