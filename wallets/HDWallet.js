const bip39 = require("bip39");
const ecc = require("tiny-secp256k1");
const { BIP32Factory } = require("bip32");
const bip32 = BIP32Factory(ecc);
const errors = require("../errors/errors");
const ChildWallet = require("./ChildWallet");
const mTools = require("../utils/mnemonicTools");
const { coins } = require("./constants"); // Consider moving coins to a constants file

class HDWallet {
  constructor(mnemonic, index = 0) {
    this.mnemonic = mnemonic;
    this.seed = bip39.mnemonicToSeedSync(this.mnemonic);
    this.root = bip32.fromSeed(this.seed);
    this.wallets = new Map();
    this.index = index;
  }

  getWallet(coinType, index = this.index) {
    if (!(coinType in coins)) {
      throw new errors.InvalidCoinError(coinType);
    }
    if (!this.wallets.has(coinType)) {
      this.wallets.set(coinType, new ChildWallet(this.root, coinType, index));
    }
    return this.wallets.get(coinType);
  }
}

module.exports = HDWallet;
