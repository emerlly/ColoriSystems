require("dotenv").config();

const mongoose = require("mongoose");

const Company = require('../models/CompanyModel');
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

    console.log("Criando Compania padrão...");


    const company = await Company.create({
        name: "Empresa Principal",
        document: "000000000001"
    });

    console.log("Atualizando registros...");

    await Product.updateMany({ company: null }, { company: company._id });
    await Category.updateMany({ company: null }, { company: company._id });
    await User.updateMany({ company: null }, { company: company._id });
    await Customer.updateMany({ company: null }, { company: company._id });
    await Order.updateMany({ company: null }, { company: company._id });
    await Supplier.updateMany({ company: null }, { company: company._id });
    await quote.updateMany({ company: null }, { company: company._id });
    await stock.updateMany({ company: null }, { company: company._id });


    console.log("Migração finalizada!");
    process.exit();
}

run();
