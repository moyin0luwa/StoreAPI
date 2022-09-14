const mongoose = require("mongoose");

const connectDB = (url) => {
	return mongoose.connect(
		url,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
		console.log("Connected to Mongo DB Successfully")
	);
};

module.exports = connectDB;
