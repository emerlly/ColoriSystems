const router = require("express").Router();
//const controller = require("../controllers/orderController");
const controller = require('../../controller/orderController')
router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.patch("/:id/status", controller.updateStatus);

module.exports = router;
