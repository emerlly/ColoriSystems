const Sale = require('../models/SaleModel');
const Product = require('../models/ProductModel');
const DashboardCache = require('../models/DashboardCacheModel');

const { startOfDay, endOfDay } = require("date-fns");

const VALID_STATUS = ["paid", "finished", "completed"];

class DashboardService {

    // =====================================================
    // RESUMO PRINCIPAL
    // =====================================================
    async summary(companyId, startDate, endDate) {

        const cache = await this.getCache(companyId, "summary", startDate, endDate);
        if (cache) return cache.data;

        const start = new Date(startDate);
        const end = new Date(endDate);

        const sales = await Sale.aggregate([

            {
                $match: {
                    companyId,
                    status: { $in: VALID_STATUS },
                    createdAt: { $gte: start, $lte: end },
                },
            },
            {
                $group: {
                    _id: null,
                    revenue: { $sum: "$totalValue" },
                    profit: { $sum: { $ifNull: ["$profit", 0] } },
                    salesCount: { $sum: 1 },
                },
            },
        ]);

        const current = sales[0] || {
            revenue: 0,
            profit: 0,
            salesCount: 0,
        };

        const ticketAverage =
            current.salesCount > 0 ? current.revenue / current.salesCount : 0;

        // ================= HOJE =================
        const todayStart = startOfDay(new Date());
        const todayEnd = endOfDay(new Date());

        const today = await Sale.aggregate([
            {
                $match: {
                    companyId,
                    status: { $in: VALID_STATUS },
                    createdAt: { $gte: todayStart, $lte: todayEnd },
                },
            },
            {
                $group: {
                    _id: null,
                    revenue: { $sum: "$totalValue" },
                    salesCount: { $sum: 1 },
                },
            },
        ]);

        // ================= ESTOQUE =================
        const stock = await Product.aggregate([
            { $match: { companyId } },
            {
                $project: {
                    isLow: { $lte: ["$stockQuantity", "$minStock"] },
                    isOut: { $eq: ["$stockQuantity", 0] },
                },
            },
            {
                $group: {
                    _id: null,
                    low: { $sum: { $cond: ["$isLow", 1, 0] } },
                    out: { $sum: { $cond: ["$isOut", 1, 0] } },
                },
            },
        ]);

        const result = {
            revenue: current.revenue,
            profit: current.profit,
            salesCount: current.salesCount,
            ticketAverage,
            today: today[0] || { revenue: 0, salesCount: 0 },
            stock: stock[0] || { low: 0, out: 0 },
        };

        await this.setCache(companyId, "summary", startDate, endDate, result);

        return result;
    }

    // =====================================================
    // VENDAS POR PERÍODO
    // =====================================================
    async salesByPeriod(companyId, startDate, endDate) {
        const cache = await this.getCache(companyId, "salesByPeriod", startDate, endDate);
        if (cache) return cache.data;

        const data = await Sale.aggregate([
            {
                $match: {
                    companyId,
                    status: { $in: VALID_STATUS },
                    createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%d/%m", date: "$createdAt" },
                    },
                    revenue: { $sum: "$totalValue" },
                    profit: { $sum: { $ifNull: ["$profit", 0] } },
                },
            },
            {
                $project: {
                    period: "$_id",
                    revenue: 1,
                    profit: 1,
                    _id: 0,
                },
            },
            { $sort: { period: 1 } },
        ]);

        await this.setCache(companyId, "salesByPeriod", startDate, endDate, data);

        return data;
    }

    // =====================================================
    // PRODUTOS MAIS VENDIDOS
    // =====================================================
    async topProducts(companyId, startDate, endDate, limit = 5) {
        return Sale.aggregate([
            {
                $match: {
                    companyId,
                    status: { $in: VALID_STATUS },
                    createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
                },
            },
            { $unwind: "$items" },
            {
                $group: {
                    _id: "$items.product",
                    quantity: { $sum: "$items.quantity" },
                    revenue: { $sum: "$items.totalValue" },
                },
            },
            { $sort: { quantity: -1 } },
            { $limit: Number(limit) },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "product",
                },
            },
            {
                $project: {
                    productId: "$_id",
                    name: { $arrayElemAt: ["$product.name", 0] },
                    quantity: 1,
                    revenue: 1,
                    _id: 0,
                },
            },
        ]);
    }

    // =====================================================
    // ALERTAS
    // =====================================================
    async alerts(companyId) {
        const stock = await Product.aggregate([
            { $match: { companyId } },
            {
                $project: {
                    isLow: { $lte: ["$stockQuantity", "$minStock"] },
                    isOut: { $eq: ["$stockQuantity", 0] },
                },
            },
            {
                $group: {
                    _id: null,
                    lowStock: { $sum: { $cond: ["$isLow", 1, 0] } },
                    outOfStock: { $sum: { $cond: ["$isOut", 1, 0] } },
                },
            },
        ]);

        return stock[0] || { lowStock: 0, outOfStock: 0 };
    }

    // =====================================================
    // CACHE
    // =====================================================
    async getCache(companyId, type, startDate, endDate) {
        const now = new Date();

        return DashboardCache.findOne({
            companyId,
            type,
            startDate,
            endDate,
            expiresAt: { $gt: now },
        });
    }

    async setCache(companyId, type, startDate, endDate, data) {
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        await DashboardCache.create({
            companyId,
            type,
            startDate,
            endDate,
            data,
            expiresAt,
        });
    }
}

module.exports = new DashboardService();
