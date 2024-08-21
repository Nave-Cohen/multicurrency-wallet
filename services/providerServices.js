require("dotenv").config({ path: "../.env" });

const { ethers } = require("ethers");
const errors = require("../errors/errors");

const rpcMap = {
  ETH: { test: "sepolia", prod: "mainnet" },
  POLY: { test: "polygon-amoy", prod: "polygon-mainnet" },
};

function getProvider(coinType, apiKey = process.env.API_KEY) {
  const isTestEnv = process.env.NODE_ENV === "test";
  const env = isTestEnv ? "test" : "prod";
  const rpc = rpcMap[coinType]?.[env];

  if (!rpc) {
    throw new errors.InvalidCoinError(coinType);
  }

  const rpcUrl = `https://${rpc}.infura.io/v3/${apiKey}`;
  return new ethers.JsonRpcProvider(rpcUrl);
}

module.exports = {
  getProvider,
};
