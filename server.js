require("dotenv").config();
// async errors

const express = require("express");
const app = express();

// Error Handling
const notFoundMiddleware = require("./src/middleware/not-found");
const errorMiddleware = require("./src/middleware/error-handler");

//express json middleware
app.use(express.json());

// Route
app.get("/", (req, res) => {
	res.send("STORE IS OPEN");
});

// using the error handlers
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
	try {
		// connectDB
		app.listen(port, () => console.log(`Server listening on PORT ${port}...`));
	} catch (error) {
		console.log(error); 
	}
};

start();
