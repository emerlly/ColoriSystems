const dashboardService = require('../services/DashboardService');

class DashboardController {
  async summary(req, res) {
    try {

      const { startDate, endDate } = req.query;
      const company = req.companyId;

      const data = await dashboardService.summary(
        company,
        startDate,
        endDate
      );

      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async salesByPeriod(req, res) {
    try {
      const { startDate, endDate } = req.query;
      const company = req.companyId;

      const data = await dashboardService.salesByPeriod(
        company,
        startDate,
        endDate
      );
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async topProducts(req, res) {
    try {
      const { startDate, endDate, limit } = req.query;
      const company = req.companyId;

      const data = await dashboardService.topProducts(
        company,
        startDate,
        endDate,
        limit
      );

      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async profitByPeriod(req, res) {
    try {
      const { startDate, endDate } = req.query;
      const company = req.companyId;
      const data = await dashboardService.profitByPeriod(
        company,
        startDate,
        endDate
      );
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async alerts(req, res) {
    try {
      const companyId = req.companyId;
      const data = await dashboardService.alerts(companyId);
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }


}

module.exports = new DashboardController();
