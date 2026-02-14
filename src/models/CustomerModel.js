const { mongoose } = require('./ConnectionModel');

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    document: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    documentType: {
      type: String,
      required: true,
      enum: ['CPF', 'CNPJ']
    },

    phone: {
      type: String,
      trim: true
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Email inválido']
    },

    active: {
      type: Boolean,
      default: true
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
    },
  },
  { timestamps: true },

);

module.exports = mongoose.model('Customer', CustomerSchema);
