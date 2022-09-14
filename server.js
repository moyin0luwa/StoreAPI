require("dotenv").config();
// async errors
require('express-async-errors')

const express = require("express");
const app = express();


const connectDB = require('./src/db/connect')

const productRoute = require('./src/router/router')

// Error Handling
const notFoundMiddleware = require("./src/middleware/not-found");
const errorMiddleware = require("./src/middleware/error-handler");

//express json middleware
app.use(express.json());

// Route
app.use('/products', productRoute )

app.get("/", (req, res) => {
	res.send("STORE IS OPEN");
});

// using the error hand lers
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
	try {
		// connectDB
        await connectDB(process.env.MONGO_URI)
		app.listen(port, () => console.log(`Server listening on PORT ${port}...`));
	} catch (error) {
		console.log(error); 
	}
};

start();
