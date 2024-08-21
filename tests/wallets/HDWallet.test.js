require("dotenv").config();
const HDWallet = require("../../wallets/HDWallet");
const errors = require("../../errors/errors");

const mnemonic = process.env.HDWallet_MNEMONIC;
let wallets;

beforeAll(() => {
  // Initialize wallets instance once for all tests
  wallets = new HDWallet(mnemonic);
});
test.concurrent("HDWallet - getWallet for ETH should succeed", () => {
  const wallet = wallets.getWallet("ETH");
  expect(wallet).not.toBeNull();
  expect(wallet.address).toBeDefined();
});

test.concurrent("HDWallet - getWallet for POLY should succeed", () => {
  const wallet = wallets.getWallet("POLY");
  expect(wallet).not.toBeNull();
  expect(wallet.address).toBeDefined();
});

test.concurrent("HDWallet - getWallet with invalid coin should fail", () => {
  expect(() => wallets.getWallet("BTC")).toThrow(errors.InvalidCoinError);
});

test.concurrent(
  "HDWallet - wallet restored from existing mnemonic should succeed",
  () => {
    const wallet = wallets.getWallet("ETH");
    expect(wallet.address).toBe("0xa35aB732D143518bdCbeDC65eb437147fDD14aCc");
  }
);
