require("dotenv").config();
const mTools = require("../../utils/mnemonicTools");

test("isValidMnemonic - invalid mnemonic should fail", () => {
  const result = mTools.isValidMnemonic(
    "fail test mnemonic fail test mnemonic fail test mnemonic fail test mnemonic"
  );
  expect(result).toBe(false);
});

test("isValidMnemonic - valid mnemonic should succeed", () => {
  const mnemonic = process.env.HDWallet_MNEMONIC;
  const result = mTools.isValidMnemonic(mnemonic);
  expect(result).toBe(true);
});

test("generateMnemonic - generate valid mnemonic should succeed", () => {
  const mnemonic = mTools.generateMnemonic();
  const result = mTools.isValidMnemonic(mnemonic);
  expect(result).toBe(true);
});
