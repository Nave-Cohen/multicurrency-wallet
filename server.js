const express = require("express");
const sessions = require("./services/sessions");
const errorHandler = require("./middleware/errorHandler");
const walletRoutes = require("./routes/walletRoutes");
const walletOperations = require("./routes/walletOperations");
const jwt = require("./middleware/wallet");

const app = express();

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(sessions);

app.get("/", async (req, res) => {
  const referer = req.get("Referer") || req.get("Referrer");
  if (referer) {
    res.status(302).send({});
  } else {
    res.send({});
  }
});

app.use("/wallet", walletRoutes);
app.use("/dashboard", jwt, walletOperations);
app.use(errorHandler);

module.exports = app;
