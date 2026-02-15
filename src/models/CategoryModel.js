const { mongoose } = require('./ConnectionModel');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },

    description: {
      type: String,
      trim: true
    },

    active: {
      type: Boolean,
      default: true
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CompanyId',
      required: true //setado como null para permitir categorias sem company, caso necessário, 
      // alterar para 'required: true' quando for obrigatório associar uma categoria a um company
    }
  },
  { timestamps: true }
);


categorySchema.index({ name: 1 }, { unique: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
