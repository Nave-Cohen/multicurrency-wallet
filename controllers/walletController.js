const express = require("express");
const router = express.Router();
const mTools = require("../utils/mnemonicTools");
const HDWallet = require("../wallets/HDWallet");
const errors = require("../errors/errors");
const jwt = require("../middleware/wallet");

// Generate a new mnemonic and send it to the client
const generateMnemonicRoute = (req, res, next) => {
  try {
    const mnemonic = mTools.generateMnemonic();
    res.status(200).json({ mnemonic });
  } catch (error) {
    next(new errors.MnemonicGenerationError(error.message));
  }
};

// Initialize wallets with a provided mnemonic
const createWallet = (req, res, next) => {
  try {
    const { mnemonic } = req.body;
    if (!mnemonic) {
      next(new errors.InvalidMnemonicError("Mnemonic is required"));
    }
    if (!mTools.isValidMnemonic(mnemonic)) {
      next(new errors.InvalidMnemonicError(mnemonic));
    }
    const wallet = new HDWallet(mnemonic);
    req.session.address = wallet.getWallet("ETH").address;
    req.session.mnemonic = mnemonic;
    res.status(200).json({
      message: "Wallet created successfully",
      "wallet-address": req.session.address,
    });
  } catch (error) {
    next(error);
  }
};

// Restore wallet with a provided mnemonic
const restoreWallet = (req, res, next) => {
  try {
    const { mnemonic } = req.body;
    if (!mnemonic) {
      next(new errors.InvalidMnemonicError("Mnemonic is required"));
    }
    if (!mTools.isValidMnemonic(mnemonic)) {
      next(new errors.InvalidMnemonicError(mnemonic));
    }
    const wallet = new HDWallet(mnemonic);
    req.session.mnemonic = mnemonic;
    req.session.address = wallet.getWallet("ETH").address;
    res.status(200).json({
      message: "Wallet restored successfully",
      "wallet-address": req.session.address,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateMnemonicRoute,
  createWallet,
  restoreWallet,
};
