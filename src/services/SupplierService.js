const Supplier = require('../models/SupplierModel');

const { isValidCNPJ, normalizeCNPJ } = require('../utils/validators/validateCNPJ');
const validateCPF = require('../utils/validators/ValidateCPF');

class SupplierService {

    async create(data) {
        const {
            name,
            document,
            documentType,
            email,
            phone,
            address
        } = data;

        if (!name || !document || !documentType) {
            throw new Error('Nome, documento e tipo de documento são obrigatórios');
        }
        let normalizedDocument;

        if (documentType === 'CNPJ') {
            if (!isValidCNPJ(document)) {
                throw new Error('CNPJ inválido');
            }
            normalizedDocument = normalizeCNPJ(document);
        }
        if (documentType === 'CPF') {
            if (!validateCPF(document)) {
                throw new Error('CPF inválido');
            }
            normalizedDocument = normalizeCNPJ(document);
        }

        const existingSupplier = await Supplier.findOne({ document: normalizedDocument });
        if (existingSupplier) {
            throw new Error('Fornecedor com este documento já existe');
        }
        
        const supplier = Supplier.create({
            name,
            document: normalizedDocument,
            documentType,
            email,
            
            phone,
            address
        });
        return supplier;

    }
    async getAllSuppliers() {
        return await Supplier.find();
    }

}

module.exports = new SupplierService();