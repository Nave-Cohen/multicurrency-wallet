const { ethers } = require("ethers");
const { getProvider } = require("../services/providerServices");
const errors = require("../errors/errors");

class ChildWallet {
  constructor(root, coinType, index = 0) {
    this.coinType = coinType;
    this.provider = getProvider(coinType);
    this.wallet = this.initWallet(root, index); // Changed to return value directly
    this.address = this.wallet.address;
  }

  initWallet(root, index) {
    const path = `m/44'/60'/0'/0/${index}`;
    const child = root.derivePath(path);
    const privateKey = child.privateKey.toString("hex");
    return new ethers.Wallet(privateKey, this.provider); // Return wallet directly
  }

  async getBalance() {
    try {
      const balance = await this.provider.getBalance(this.wallet.address);
      return ethers.formatEther(balance);
    } catch (error) {
      throw new errors.BalanceError(this.coinType);
    }
  }

  async sendTransaction(to, amount) {
    try {
      const txParams = await this.getTransactionParams();
      txParams.to = to;
      txParams.value = ethers.parseUnits(amount.toString(), "ether");

      return await this.wallet.sendTransaction(txParams);
    } catch (error) {
      if (error.message.includes("insufficient funds")) {
        throw new errors.InsufficientFundsError(
          await this.getBalance(),
          amount
        );
      } else {
        throw new errors.TransactionError(error.message, this.coinType);
      }
    }
  }

  async getTransactionParams() {
    try {
      const feeData = await this.provider.getFeeData();
      const nonce = await this.provider.getTransactionCount(
        this.wallet.address,
        "latest"
      );

      return {
        from: this.wallet.address,
        nonce: ethers.toBeHex(nonce),
        gas: ethers.toBeHex(21000),
        gasPrice: ethers.toBeHex(feeData.gasPrice),
      };
    } catch (error) {
      throw new errors.TransactionError(error.message, this.coinType);
    }
  }
}

module.exports = ChildWallet;
