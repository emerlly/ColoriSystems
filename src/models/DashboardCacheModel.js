const mongoose = require("mongoose");

const DashboardCacheSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CompanyId",
      required: true,
      index: true,
    },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    type: { type: String, required: true }, // summary | salesByPeriod etc
    data: { type: Object, required: true },
    expiresAt: { type: Date, required: true, index: true },
  },
  { timestamps: true }
);

// remove automaticamente após vencer
DashboardCacheSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("DashboardCache", DashboardCacheSchema);
