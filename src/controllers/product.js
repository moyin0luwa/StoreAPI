const productList = require("../models/productModel");

const getAllProductsStatic = async (req, res) => {
	const products = await productList.find({}).sort("-name");
	res.status(200).json({ products, nbHits: products.length });
};

// Controller for the function to obtain a certain product or list of products fro a search query
const getAllProducts = async (req, res) => {
	const { featured, company, name, sort } = req.query;
	const queryObject = {};
	if (featured) {
		queryObject.featured = featured === "true" ? true : false;
	}

	if (company) {
		queryObject.company = company;
	}

	if (name) {
		queryObject.name = { $regex: name, $options: "i" }; //Regex is used here for pattern matching to search for like the first two letters and return all matching results. 'i' is the option indicating that the case of the lettrs dont matter as long as the pattern match
	}
	// console.log(queryObject);
	let searchResult = productList.find(queryObject); //filter to be used can be selected by inserting the category into the find
	if (sort) {
		const sortParams = sort.split(",").join(" "); //in the event where a number of variables are to be used for the sorting, this formats them to the proper syntax
		searchResult = searchResult.sort(sortParams)
	} else {
		searchResult = searchResult.sort('createdAt')
	}

	const products = await searchResult;
	res.status(200).json({ products, nbHits: products.length }); //nbhits shows the number of results that fulfill the search criteria
};

const addProduct = async (req, res) => {
	let product = await req.body;
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
	addProduct,
};
