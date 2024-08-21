require("dotenv").config();
const bip39 = require("bip39");
const ecc = require("tiny-secp256k1");
const { BIP32Factory } = require("bip32");
const bip32 = BIP32Factory(ecc);

function getPrivateKey(mnemonic, pathIndex = 0) {
  const path = `m/44'/60'/0'/0/${pathIndex}`;
  // Derive seed from mnemonic
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  // Create a BIP32 root key from the seed
  const root = bip32.fromSeed(seed);
  // Derive the Ethereum key from the root using the BIP44 path
  const child = root.derivePath(path);
  // Get the private key in hexadecimal format
  const privateKey = child.privateKey.toString("hex");

  return privateKey;
}

/**
 * The function generates a mnemonic using the bip39 library in JavaScript.
 * @returns A mnemonic phrase is being returned.
 */
function generateMnemonic() {
  return bip39.generateMnemonic();
}

/**
 * Validates a BIP-39 mnemonic.
 * @param {string} mnemonic - The mnemonic phrase to validate.
 * @returns {boolean} - Returns true if the mnemonic is valid, false otherwise.
 */

function isValidMnemonic(mnemonic) {
  try {
    // Check if the mnemonic is valid and if it follows the BIP-39 standard
    return bip39.validateMnemonic(mnemonic);
  } catch (error) {
    return false;
  }
}

module.exports = { generateMnemonic, getPrivateKey, isValidMnemonic };
