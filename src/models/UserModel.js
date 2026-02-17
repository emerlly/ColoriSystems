const { mongoose } = require('./ConnectionModel');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    cpf: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: [/^\S+@\S+\.\S+$/, 'Email inválido']
    },

    password: {
      type: String,
      required: true,
      select: false
    },

    role: {
      type: String,
      enum: ['admin', 'operator', 'stockist', 'manager', 'seller', 'customer'],
      default: 'operator',
      index: true
    },

    active: {
      type: Boolean,
      default: true,
      index: true
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'companyId',
      required: true //setado como null para permitir usuários sem company, caso necessário, 
      // alterar para 'required: true' quando for obrigatório associar um usuário a um company
    }
  },
  { timestamps: true }
);

// hash da senha
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// comparação de senha
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('users', userSchema);

module.exports = User;
