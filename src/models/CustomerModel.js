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
    createdAt: {
      type: Date,
      default: Date.now
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CompanyId',
      required: true //setado como null para permitir clientes sem company, caso necessário, 
      // alterar para 'required: true' quando for obrigatório associar um cliente a um company
    }
  },
  { timestamps: true },

);
const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;