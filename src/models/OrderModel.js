const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pendente", "separando", "produzindo", "enviado", "entregue"],
    default: "pendente",
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true //setado como null para permitir itens de pedido sem company, caso necessário,
  }
});

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    items: [orderItemSchema],

    totalOrder: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pendente", "separando", "produzindo", "enviado", "entregue"],
      default: "pendente",
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CompanyId',
      required: true //setado como null para permitir pedidos sem company, caso necessário, 
      // alterar para 'required: true' quando for obrigatório associar um pedido a um company
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order
