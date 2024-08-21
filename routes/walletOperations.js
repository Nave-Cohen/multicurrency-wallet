const express = require("express");
const router = express.Router();
const walletController = require("../controllers/walletOperationController");

router.get("/:coinType/balance", walletController.getWalletBalance);

router.post("/send", walletController.sendTransaction);
module.exports = router;
