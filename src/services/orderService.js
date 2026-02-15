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
  
  async create({ customerId, items, status, companyId }) {

    if (!company) throw new Error("Empresa não informada");
 
    const customer = await Custmers.findOne({
      _id: customerId,
      company: company
    });

    if (!customer) throw new Error("Cliente não encontrado");
    if (!items?.length) throw new Error("Pedido sem itens");

    let valorTotal = 0;
    const processedItems = [];

    for (const item of items) {
      const product = await Product.findOne({
        _id: item.productId,
        company: company
      });

      if (!product) throw new Error("Produto não encontrado");

      const quantity = Number(item.quantity);
      if (!quantity || quantity <= 0) {
        throw new Error("Quantidade inválida");
      }

      const unitPrice = Number(product.salePrice);
      if (isNaN(unitPrice)) {
        throw new Error("Produto com preço inválido");
      }

      const subtotal = quantity * unitPrice;
      valorTotal += subtotal;

      processedItems.push({
        product: product._id,
        quantity,
        unitPrice,
        total: subtotal,
        company
      });
    }

    const finalStatus = status || "PENDENTE";

    if (!status.includes(finalStatus)) {
      throw new Error("Status inválido");
    }

    const order = await Order.create({
      company: company,
      customer: customer._id,
      items: processedItems,
      totalOrder: valorTotal,
      status: finalStatus,
    });

    return order;
  }



  async getAll(companyId) {
    return Order.find({ companyId: companyId })
      .populate("customer")
      .populate("items.product")
      .sort({ createdAt: -1 });
  }


  async getById(id, companyId) {
    const order = await Order.findOne({
      _id: id,
      companyId: companyId
    })
      .populate("customer")
      .populate("items.product");

    if (!order) throw new Error("Pedido não encontrado");
    return order;
  }


  async updateStatus(id, newStatus, company) {
    const order = await Order.findOne({
      _id: id,
      companyId: companyId
    });

    if (!order) throw new Error("Pedido não encontrado");

    const currentIndex = STATUS_FLOW.indexOf(order.status);
    const newIndex = STATUS_FLOW.indexOf(newStatus);

    if (newIndex === -1) throw new Error("Status inválido");

    // impede voltar status
    if (newIndex < currentIndex) {
      throw new Error("Não é permitido voltar o status do pedido");
    }

    order.status = newStatus;
    await order.save();

    if (newStatus === "SEPARANDO") {
      for (const item of order.items) {
        await StockMovement.create({
          companyId: company,
          type: "out",
          product: item.product,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        });
      }
    }

    return order;
  }
}

module.exports = new OrderService();
