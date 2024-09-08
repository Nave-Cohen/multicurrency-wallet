const express = require("express");
const sessions = require("./services/sessions");
const errorHandler = require("./middleware/errorHandler");
const walletRoutes = require("./routes/walletRoutes"); // Adjust path as needed
const walletOperations = require("./routes/walletOperations"); // Adjust path as needed
const jwt = require("./middleware/wallet");

const app = express();
const port = 3000;

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
