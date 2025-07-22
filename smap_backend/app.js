const express = require("express");
const app = express();

const setupSwagger = require("./swagger"); // <-- import swagger setup

app.use(express.json());
const cors = require('cors');
app.use(cors());

// Routes
app.use("/api/stores", require("./routes/storeRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/walkins", require("./routes/walkinRoutes"));
app.use("/api/telco-trends", require("./routes/telcoTrendRoutes"));
app.use("/api/recommendations", require("./routes/recommendationRoutes"));

// Swagger
setupSwagger(app); // <-- Call the swagger setup function

// Test endpoint
app.get("/hello", (req, res) => {
  res.send("hello world");
});

module.exports = app;
