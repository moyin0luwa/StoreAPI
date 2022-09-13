const errorHandlerMiddleware = async (err, req, res, next) => {
	console.log(err);
	return res
		.status(500)
		.json({ msg: "Something is not right, please try again" });
};

module.exports = errorHandlerMiddleware;
