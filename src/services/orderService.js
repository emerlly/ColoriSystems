const Order = require('../models/OrderModel');
const Custmers = require('../models/CustomerModel');
const Product = require('../models/ProductModel');
const StockMovement = require('../models/StockModel');

const STATUS_FLOW = [
  "PENDENTE",
  "SEPARANDO",
  "PRODUZINDO",
  "ENVIADO",
  "ENTREGUE",
];

class OrderService {
  
  async create({ customerId, items }) {
    const customer = await Custmers.findById(customerId);

    console.log("Customer:", customer);
    
    if (!customer) throw new Error("Cliente não encontrado");

    if (!items?.length) throw new Error("Pedido sem itens");

    let valorTotal = 0;
    const processedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) throw new Error("Produto não encontrado");

      const subtotal = item.quantidade * product.price;
      valorTotal += subtotal;

      processedItems.push({
        product: product._id,
        quantidade: item.quantidade,
        precoUnitario: product.price,
        subtotal,
      });
    }

    const order = await Order.create({
      customer: customer._id,
      items: processedItems,
      totalOrder: valorTotal,
      status: "PENDENTE",
    });

    return order;
  }


  async getAll() {
    return Order.find()
      .populate("customer")
      .populate("items.product")
      .sort({ createdAt: -1 });
  }

 
  async getById(id) {
    const order = await Order.findById(id)
      .populate("customer")
      .populate("items.product");

    if (!order) throw new Error("Pedido não encontrado");
    return order;
  }


  async updateStatus(id, newStatus) {
    const order = await Order.findById(id);
    if (!order) throw new Error("Pedido não encontrado");

    const currentIndex = STATUS_FLOW.indexOf(order.situacao);
    const newIndex = STATUS_FLOW.indexOf(newStatus);

    if (newIndex === -1) throw new Error("Status inválido");

    // impede voltar status
    if (newIndex < currentIndex) {
      throw new Error("Não é permitido voltar o status do pedido");
    }

    order.situacao = newStatus;
    await order.save();

    if (newStatus === "SEPARANDO") {
      for (const item of order.items) {
        await StockMovement.create({
          type: "out",
          product: item.product,
          quantity: item.quantidade,
          unitPrice: item.precoUnitario,
        });
      }
    }

    return order;
  }
}

module.exports = new OrderService();
