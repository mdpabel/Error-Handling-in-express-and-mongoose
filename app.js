const express = require("express");
require("dotenv").config();
const bodyParse = require("body-parser");
const app = express();
const productRouter = require("./src/routes/productRoutes");
require("./src/db/mongoose");
const errorHandler = require("./src/middleware/error");

const api = process.env.API_URI;

app.use(bodyParse.json({ extended: false }));

app.use(api, productRouter);

// MIDDLEWARE
app.use(errorHandler);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
