const ReportService = require('../services/ReportService');

const getSalesReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const result = await ReportService.salesByPeriod(startDate, endDate);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLowStockReport = async (req, res) => {
  try {
    const result = await ReportService.lowStockProducts();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProfitReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const result = await ReportService.profitByPeriod(startDate, endDate);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const exportToExcel = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        message: 'startDate e endDate são obrigatórios'
      });
    }

    // Buscar dados do relatório
    const reportData = await ReportService.salesByProduct(startDate, endDate);

    // Criar workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Relatório de Vendas');

    // Cabeçalhos
    worksheet.columns = [
      { header: 'Produto', key: 'product', width: 30 },
      { header: 'Quantidade Vendida', key: 'totalQuantity', width: 20 },
      { header: 'Valor Total (R$)', key: 'totalValue', width: 20 }
    ];

    // Estilo do cabeçalho
    worksheet.getRow(1).font = { bold: true };

    // Dados
    reportData.forEach(item => {
      worksheet.addRow({
        product: item.product,
        totalQuantity: item.totalQuantity,
        totalValue: item.totalValue
      });
    });

    // Configurar resposta
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );

    res.setHeader(
      'Content-Disposition',
      'attachment; filename=relatorio_vendas.xlsx'
    );

    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao gerar relatório em Excel' });
  }
};

const salesBySeller = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const result = await ReportService.salesBySeller(startDate, endDate);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  getSalesReport,
  getLowStockReport,
  getProfitReport,
  exportToExcel,
  salesBySeller
};
