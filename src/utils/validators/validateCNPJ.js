function normalizeCNPJ(cnpj) {
  return cnpj.replace(/\D/g, '');
}

function isValidCNPJ(cnpj) {
  if (!cnpj) return false;

  cnpj = normalizeCNPJ(cnpj);

  // Deve ter 14 dígitos
  if (cnpj.length !== 14) return false;

  // Rejeita sequências repetidas
  if (/^(\d)\1+$/.test(cnpj)) return false;

  const calcDigit = (base) => {
    let sum = 0;
    let weight = base.length - 7;

    for (let i = 0; i < base.length; i++) {
      sum += Number(base[i]) * weight--;
      if (weight < 2) weight = 9;
    }

    const result = sum % 11;
    return result < 2 ? 0 : 11 - result;
  };

  const base = cnpj.slice(0, 12);
  const digit1 = calcDigit(base);
  const digit2 = calcDigit(base + digit1);

  return cnpj === base + digit1 + digit2;
}

module.exports = {
  isValidCNPJ,
  normalizeCNPJ
};