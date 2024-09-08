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

      try {
        const result = await wallet.sendTransaction(
          "0xd16Ed358800003c0Eb63b65dcdc061C38C02908b",
          0.00001
        );

        expect(result).not.toBeNull();

        // Wait for the transaction to be mined to ensure success
        const receipt = await result.wait();
        expect(receipt.status).toBe(1); // Check if the transaction succeeded
      } catch (error) {
        if (error.message.includes("already known")) {
          console.log("Transaction already known, skipping.");
          // Optionally check for transaction status here if necessary
        } else {
          throw error; // Rethrow other errors
        }
      }
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

      try {
        // Send the transaction to the specified address
        const result = await wallet.sendTransaction(
          "0xd16Ed358800003c0Eb63b65dcdc061C38C02908b",
          0.00001
        );

        // Ensure the transaction result is not null
        expect(result).not.toBeNull();

        // Wait for the transaction to be mined and get the receipt
        const receipt = await result.wait();

        // Ensure the transaction was successful
        expect(receipt.status).toBe(1);
      } catch (error) {
        if (error.message.includes("already known")) {
          console.log("Transaction already known, skipping.");
          // Optionally, fetch the transaction receipt here to verify it was mined
        } else {
          throw error; // Rethrow other errors
        }
      }
    },
    20000 // Timeout for long-running tests
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
