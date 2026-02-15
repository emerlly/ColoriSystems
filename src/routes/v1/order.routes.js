const router = require("express").Router();
const controller = require('../../controller/orderController')

const { auth,  } = require('../../middlewares/authMiddleware');
router.use(auth);

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:id",  controller.getById);
router.patch("/:id/status", controller.updateStatus);

module.exports = router;
