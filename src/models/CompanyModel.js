
const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    document: { type: String},
    status: { type: String, enum: ['ACTIVE','SUSPENDED','INACTIVE','TRIAL'], default: 'ACTIVE' },
    plan: { type: String, enum: ['FREE','BASIC','PRO'], default: 'FREE' },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Company = mongoose.model('CompanyId', companySchema);
module.exports = Company;