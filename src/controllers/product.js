const productList = require("../models/productModel");

const getAllProductsStatic = async (req, res) => {
	const products = await productList
		.find({ price: { $gt: 2500 } })
		.sort("price")
		.select("name price rating");
	// .limit(10)
	// .skip(10);
	res.status(200).json({ products, nbHits: products.length });
};

// Controller for the function to obtain a certain product or list of products from a search query
const getAllProducts = async (req, res) => {
	const { featured, company, name, sort, fields, numericFilters } = req.query;
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

	if (numericFilters) {
		const operatorMap = {
			">": "$gt",
			">=": "$gte",
			"=": "$eq",
			"<": "$lt",
			"<=": "$lte",
		};
		const regEx = /\b(>|>=|=|<|<=)\b/g;
		let filters = numericFilters.replace(
			regEx,
			(match) => `-${operatorMap[match]}-`
		); //checking if theres a match between the query object numeric filter and the regEx then replacing the match accordingly with the operatorMap
		const options = ['price', 'rating']
		filters = filters.split(',').forEach( (item) => { 
			const [ field, operator, value ] = item.split('-')
			if (options.includes(field)) {
				queryObject[field] = { [operator] : Number(value)}
			}
		} )
		console.log(filters);
	}
	console.log(queryObject);

	// Sorting Functionality for the search filter
	let searchResult = productList.find(queryObject); //filters to be used for sorting can be selected by inserting the category into the find
	if (sort) {
		const sortParams = sort.split(",").join(" "); //in the event where a number of variables are to be used for the sorting, this formats them to the proper syntax
		searchResult = searchResult.sort(sortParams);
	} else {
		searchResult = searchResult.sort("createdAt");
	}

	// Functionality to select which fields to be dispalyed in the search results
	if (fields) {
		const selectFields = fields.split(",").join(" ");
		searchResult = searchResult.select(selectFields);
	}

	//Limit functionality to control the amount of products returned as results used in conjunction with skip which skips a certain number of product to achieve pagination
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const skip = (page - 1) * limit;
	searchResult = searchResult.skip(skip).limit(limit);

	const products = await searchResult;
	res.status(200).json({ nbHits: products.length, products }); //nbhits shows the number of results that fulfill the search criteria
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
