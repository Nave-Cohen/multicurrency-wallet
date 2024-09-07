const HDWallet = require("../wallets/HDWallet");

const sendTransaction = async (req, res, next) => {
  const wallets = new HDWallet(req.session.mnemonic);
  try {
    const { coinType, to, amount } = req.body;
    const wallet = wallets.getWallet(coinType);
    let transactionResult = await wallet.sendTransaction(to, amount);
    // Wait for the transaction to be mined
    const receipt = await transactionResult.wait();
    transactionResult.blockNumber = receipt.blockNumber;
    transactionResult.blockHash = receipt.blockHash;
    transactionResult.gasPrice = receipt.gasPrice;
    res.status(200).json({ TransactionResponse: transactionResult });
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
