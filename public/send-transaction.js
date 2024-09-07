document.addEventListener("DOMContentLoaded", function () {
  const sendBtn = document.getElementById("send-btn");
  const addressInput = document.getElementById("address-input");
  const amountInput = document.getElementById("amount-input");
  const coinSelect = document.getElementById("coin-select");
  const errorMessage = document.getElementById("error-message");
  const loadingSpinner = document.getElementById("spinner-container");

  // Get the coin type from the URL query parameter (e.g., ?coin=ETH)
  const urlParams = new URLSearchParams(window.location.search);
  const selectedCoin = urlParams.get("coin");

  // Set the coin dropdown to the passed coin type
  if (selectedCoin) {
    coinSelect.value = selectedCoin;
  }

  // Clear error messages when the user interacts with the input fields
  function clearMessages() {
    errorMessage.style.display = "none";
    loadingSpinner.style.display = "none";
  }

  // Add event listeners for clearing messages on input
  addressInput.addEventListener("input", clearMessages);
  amountInput.addEventListener("input", clearMessages);
  coinSelect.addEventListener("change", clearMessages);

  sendBtn.addEventListener("click", function () {
    // Clear previous messages
    errorMessage.style.display = "none";
    errorMessage.textContent = "";

    const address = addressInput.value.trim();
    const amount = amountInput.value.trim();
    const coin = coinSelect.value;

    // Simple validation
    if (!address || !amount || isNaN(amount) || Number(amount) <= 0) {
      errorMessage.textContent = "Please enter a valid address and amount.";
      errorMessage.style.display = "block";
      return;
    }

    // Prepare data for the backend
    const transactionData = {
      to: address,
      amount: Number(amount),
      coinType: coin,
    };

    // Send transaction data to backend
    loadingSpinner.style.display = "block"; // Show spinner
    fetch(`/dashboard/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactionData),
    })
      .then((response) =>
        response.json().then((data) => {
          if (!response.ok) {
            // Throw an error with the backend message
            throw new Error(data.message || "Something went wrong");
          }
          return data;
        })
      )
      .then((data) => {
        sessionStorage.setItem(
          "receipt",
          JSON.stringify(data.TransactionResponse)
        );
        window.location.href = "./recipt.html";
      })
      .catch((error) => {
        let errorText = error.message;

        // Handle insufficient gas or balance error
        if (
          errorText.includes("missing revert data") ||
          errorText.includes("estimateGas") ||
          errorText.includes("insufficient funds")
        ) {
          errorText =
            "Your balance is too low to cover the transaction and gas fees.";
        }

        // Handle replacement transaction underpriced error
        if (errorText.includes("replacement transaction underpriced")) {
          errorText = "You already have a pending transaction.";
        }

        // Display the error message
        loadingSpinner.style.display = "none";
        errorMessage.textContent = errorText;
        errorMessage.style.display = "block";
      });
  });

  document.getElementById("back-btn").addEventListener("click", function () {
    window.location.href = "wallet.html"; // Redirect back to the wallet page
  });
});
