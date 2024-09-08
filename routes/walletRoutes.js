const express = require("express");
const router = express.Router();
const walletController = require("../controllers/walletController");

// Route to generate a new mnemonic
router.get("/generate-mnemonic", walletController.generateMnemonicRoute);

// Route to create a new wallet
router.post("/create", walletController.createWallet);

// Route to restore an existing wallet
router.post("/restore", walletController.restoreWallet);

router.post("/logout", walletController.logout);
module.exports = router;
