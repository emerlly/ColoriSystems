

const isValidCEP = (cep) => {
  if (!cep) return false;

  // Remove tudo que não for número
  const cleanedCEP = cep.replace(/\D/g, '');

  // CEP brasileiro tem exatamente 8 dígitos
  return /^\d{8}$/.test(cleanedCEP);
};

module.exports = isValidCEP;
