const HDWallet = require("../wallets/HDWallet");

const sendTransaction = async (req, res, next) => {
  const wallets = new HDWallet(req.session.mnemonic);
  try {
    const { coinType, to, amount } = req.body;
    const wallet = wallets.getWallet(coinType);
    const transactionResult = await wallet.sendTransaction(to, amount);
    res.status(200).json({ result: transactionResult });
  } catch (error) {
    next(error);
  }
};

// Get balance of a wallet
const getWalletBalance = async (req, res, next) => {
  const wallets = new HDWallet(req.session.mnemonic);
  try {
    const { coinType } = req.params;
    const wallet = wallets.getWallet(coinType);
    const balance = await wallet.getBalance();
    res.status(200).json({ balance });
  } catch (error) {
    next(error);
  }
};

module.exports = { sendTransaction, getWalletBalance };
