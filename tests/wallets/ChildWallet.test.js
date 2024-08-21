require("dotenv").config();
const HDWallet = require("../../wallets/HDWallet");
const errors = require("../../errors/errors");

const mnemonic = process.env.HDWallet_MNEMONIC;
let wallets;

beforeAll(() => {
  wallets = new HDWallet(mnemonic);
});

describe("ETH Wallet", () => {
  test.concurrent("get balance from wallet should succeed", async () => {
    const wallet = wallets.getWallet("ETH");
    const resultBalance = await wallet.getBalance();
    expect(Number(resultBalance)).toBeCloseTo(0.01, 1);
  });

  test.concurrent(
    "send transaction should succeed",
    async () => {
      const wallet = new HDWallet(mnemonic, 1).getWallet("ETH");
      const result = await wallet.sendTransaction(
        "0xd16Ed358800003c0Eb63b65dcdc061C38C02908b",
        0.00001
      );
      expect(result).not.toBeNull();
    },
    20000
  );

  test.concurrent(
    "send transaction with insufficient funds should fail",
    async () => {
      const wallet = new HDWallet(mnemonic, 1).getWallet("ETH");
      await expect(
        wallet.sendTransaction(
          "0xd16Ed358800003c0Eb63b65dcdc061C38C02908b",
          500
        )
      ).rejects.toThrow(errors.InsufficientFundsError);
    }
  );
});

describe("POLY Wallet", () => {
  test.concurrent("get balance from wallet should succeed", async () => {
    const wallet = wallets.getWallet("POLY");
    const resultBalance = await wallet.getBalance();
    expect(Number(resultBalance)).toBeCloseTo(0.0994, 1);
  });
  test.concurrent(
    "send transaction should succeed",
    async () => {
      const wallet = new HDWallet(mnemonic, 1).getWallet("POLY");
      const result = await wallet.sendTransaction(
        "0xd16Ed358800003c0Eb63b65dcdc061C38C02908b",
        0.00001
      );
      expect(result).not.toBeNull();
    },
    20000
  );
  test.concurrent(
    "send transaction with insufficient funds should fail",
    async () => {
      const wallet = new HDWallet(mnemonic, 1).getWallet("POLY");
      await expect(
        wallet.sendTransaction(
          "0xd16Ed358800003c0Eb63b65dcdc061C38C02908b",
          500
        )
      ).rejects.toThrow(errors.InsufficientFundsError);
    }
  );
});
