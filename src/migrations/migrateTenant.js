require("dotenv").config();

const mongoose = require("mongoose");

const Tenant = require('../models/TenantModel');
const Product = require('../models/ProductModel');
const User = require('../models/UserModel');
const Category = require('../models/CategoryModel');
const Customer = require('../models/CustomerModel');
const Order = require('../models/OrderModel');
const Supplier = require('../models/SupplierModel');
const quote = require('../models/QuoteModel');
const stock = require('../models/StockModel');


async function run() {
    
    await mongoose.connect(DATABASE_URL);

    console.log("Criando tenant padrão...");


    const tenant = await Tenant.create({
        name: "Empresa Principal",
        document: "000000000001"
    });

    console.log("Atualizando registros...");

    await Product.updateMany({ tenant: null }, { tenant: tenant._id });
    await Category.updateMany({ tenant: null }, { tenant: tenant._id });
    await User.updateMany({ tenant: null }, { tenant: tenant._id });
    await Customer.updateMany({ tenant: null }, { tenant: tenant._id });
    await Order.updateMany({ tenant: null }, { tenant: tenant._id });
    await Supplier.updateMany({ tenant: null }, { tenant: tenant._id });
    await quote.updateMany({ tenant: null }, { tenant: tenant._id });
    await stock.updateMany({ tenant: null }, { tenant: tenant._id });


    console.log("Migração finalizada!");
    process.exit();
}

run();
