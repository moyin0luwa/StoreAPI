const router = require("express").Router();
const {
	getAllProductsStatic,
	getAllProducts,
	addProduct,
} = require("../controllers/product");

router.get("/", getAllProducts);
router.get("/static", getAllProductsStatic)
router.post("/", addProduct);

module.exports = router;
