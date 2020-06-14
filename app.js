const express = require("express");
const app = express()

// Tells express where my front-end code is.
const PORT = process.env.PORT || 9001;

// Serving static file in express.
app.use(express.static("public"));


// Sets up the Express app to handle data parsing.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

module.exports = app;

// Require the rout files here.
require('./routes/html-routes.js');
require('./routes/api-routes.js');

// / Starts express server.
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

