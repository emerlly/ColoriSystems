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
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CompanyId',
      required: true //setado como null para permitir fornecedores sem company, caso necessário, 
      // alterar para 'required: true' quando for obrigatório associar um fornecedor a um company
    }
  },
  { timestamps: true }
);



const Supplier = mongoose.model('supplier', supplierSchema);

module.exports = Supplier;
