class HDWalletError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name; // Automatically set the error name based on the class name
  }
}

class InvalidMnemonicError extends HDWalletError {
  constructor(mnemonic) {
    super(`Invalid mnemonic: ${mnemonic}`);
  }
}
class BalanceError extends HDWalletError {
  constructor(coinType) {
    super(`Error while try to get balance for coin ${coinType}`);
  }
}
class InvalidCoinError extends HDWalletError {
  constructor(coinType) {
    super(`Invalid coinType: ${coinType}`);
  }
}

class InsufficientFundsError extends HDWalletError {
  constructor(balance, required) {
    super(`Insufficient funds: balance ${balance}, required ${required}`);
  }
}

class TransactionError extends HDWalletError {
  constructor(message, coinType) {
    super(`Transaction error: ${message}\ncoinType:${coinType}`);
  }
}
class MnemonicGenerationError extends HDWalletError {
  constructor(message) {
    super(`Mnemonic generation error: ${message}`);
  }
}

module.exports = {
  HDWalletError,
  InvalidMnemonicError,
  InvalidCoinError,
  InsufficientFundsError,
  TransactionError,
  BalanceError,
  MnemonicGenerationError,
};
