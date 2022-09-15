const { Schema, model } = require("mongoose");
const { message } = require("prompt");

const productSchema = new Schema({
	name: {
		type: String,
		required: [true, "Please provide a product name!"],
	},
	price: {
		type: Number,
		required: [true, "Please provide a product price!"],
	},
	featured: {
		type: Boolean,
		default: false,
	},
	rating: {
		type: Number,
		default: 4.5,
	},
	createdAt: {
		type: Date,
		default: Date.now(), //Basiclly the date of creation is set to that current date
	},
	company: {
		type: String,
		enum: {
			values: ["ikea", "liddy", "caressa", "marcos"],
			message: "{VALUE} is not supported!",
		}, //This ensures onl a selct options can be chosen as companies
	},
});

const productModel = model("product", productSchema);

module.exports = productModel;