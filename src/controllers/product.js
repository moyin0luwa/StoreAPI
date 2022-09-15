const productList = require('../models/productModel')

const getAllProductsStatic = async (req, res) => {
	res.status(200).json({ msg: "Products testing route" });
};

const getAllProducts = async (req, res) => {
	res.status(200).json({ msg: "Products route" });
};

const addProduct = async (req, res) => {
	let product = await req.body;
	console.log(product)
	let added = await productList.create(product);
	if (!added) {
		return res.status(400).json({
			success: false,
			message: "Product not added",
		});
	}
	return res.status(200).json({
		success: true,
		message: "Product added successfully",
		product: added,
	});
};

module.exports = {
	getAllProductsStatic,
	getAllProducts,
	addProduct
};
