const router = require("express").Router();
const controller = require('../../controller/DashboardController');
const { auth } = require('../../middlewares/authMiddleware');

router.use(auth);

router.get("/summary", controller.summary);
router.get("/sales-by-period", controller.salesByPeriod);
router.get("/top-products", controller.topProducts);
router.get("/alerts", controller.alerts);


module.exports = router;
