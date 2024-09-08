document.addEventListener("DOMContentLoaded", function () {
  // Retrieve the transaction data from sessionStorage
  const storedReceipt = sessionStorage.getItem("receipt");

  if (storedReceipt) {
    // Parse the stored receipt JSON string back into an object
    const transactionResponse = JSON.parse(storedReceipt);

    // Call the function to display transaction details
    showTransactionDetails(transactionResponse);
  } else {
    // Handle the case where no transaction data is found (e.g., show an error or redirect)
    console.error("No transaction data found");
  }
});

// Function to display transaction details
function showTransactionDetails(transactionResponse) {
  // Gas price in wei (assuming value is in wei)
  const gasPriceWei = BigInt(transactionResponse.maxPriorityFeePerGas) || 0n;
  const gasPriceGwei = Number(gasPriceWei) / 1e9; // Convert wei to gwei
  const gasPricePol = Number(gasPriceWei) / 1e18; // Convert wei to POL

  // Gas limit and usage (assuming gasLimit is BigInt)
  const gasLimit = BigInt(transactionResponse.gasLimit) || 0n;
  const gasUsage = gasLimit; // Assuming usage is the same as limit for now

  // Base fee, max fee, and max priority fee in Gwei (example values)
  const baseFeeGwei = 1.5e-8; // Example base fee in Gwei, replace with actual value if available
  // Gas price values in wei
  const maxFeePerGasWei = BigInt(transactionResponse.maxFeePerGas) || 0n;
  const maxPriorityFeePerGasWei =
    BigInt(transactionResponse.maxPriorityFeePerGas) || 0n;
  // Convert from wei to gwei (1 Gwei = 10^9 Wei)
  const maxFeePerGasGwei = Number(maxFeePerGasWei) / 1e9;
  const maxPriorityFeePerGasGwei = Number(maxPriorityFeePerGasWei) / 1e9;
  // Burnt fee in POL (example value)
  const burntFeePol = 3.15e-13; // Example burnt fee in POL, replace with actual value if available

  // Transaction Hash, Status, Block, etc.
  const txnHash = transactionResponse.hash || "N/A";
  const blockNumber = transactionResponse.blockNumber || "N/A";
  const fromAddress = transactionResponse.from || "N/A";
  const toAddress = transactionResponse.to || "N/A";
  const amount = Number(transactionResponse.value) / 1e18; // Convert wei to POL
  const txnFeePol = (gasPricePol * Number(gasLimit)) / 1e18; // Estimate txn fee in POL

  // Update the HTML content with the calculated values
  document.getElementById("txn-hash").innerText = txnHash;
  document.getElementById("status").innerText = "success";
  document.getElementById("block-number").innerText = blockNumber;
  document.getElementById("from-address").innerText = fromAddress;
  document.getElementById("to-address").innerText = toAddress;
  document.getElementById("amount").innerText = amount.toFixed(6);
  document.getElementById("txn-fee").innerText = txnFeePol.toFixed(18);

  // Update gas details
  document.getElementById("gas-price").innerText = gasPricePol.toFixed(18);
  document.getElementById("gas-price-gwei").innerText = gasPriceGwei.toFixed(9);
  document.getElementById("gas-limit").innerText = gasLimit.toString();
  document.getElementById("gas-usage").innerText = gasUsage.toString();
  document.getElementById("base-fee").innerText = baseFeeGwei.toFixed(9);
  document.getElementById("max-fee").innerText = maxFeePerGasGwei.toFixed(9);
  document.getElementById("max-priority-fee").innerText =
    maxPriorityFeePerGasGwei.toFixed(9);
  document.getElementById("burnt-fee").innerText = burntFeePol.toFixed(15);
  sessionStorage.clear();
}
function backClicked() {
  window.location.href = "send-transaction.html"; // Redirect back to the wallet page
}
function dashboardClicked() {
  window.location.href = "wallet.html"; // Redirect back to the wallet page
}
