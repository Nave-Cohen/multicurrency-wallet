document.addEventListener("DOMContentLoaded", function () {
  const addressElement = document.getElementById("address");
  const coinSelect = document.getElementById("coin-select");
  const balanceDisplay = document.getElementById("balance");
  const makeTransactionBtn = document.getElementById("make-transaction-btn");

  // Retrieve wallet address from sessionStorage
  const address = sessionStorage.getItem("walletAddress");

  if (address) {
    addressElement.textContent = address;
  } else {
    addressElement.textContent = "Error loading address";
  }

  // Function to fetch and display balance
  function updateBalance(coinType) {
    fetch(`/dashboard/${coinType}/balance`)
      .then((response) => {
        if (response.status === 302) {
          window.location.href = "index.html"; // Redirect to home page
        }
        return response.json();
      })

      .then((data) => {
        balanceDisplay.textContent = `${
          data.balance || "Error loading balance"
        } ${coinType}`;
      })
      .catch((error) => {
        console.error(`Error fetching ${coinType} balance:`, error);
        balanceDisplay.textContent = "Error loading balance";
      });
  }

  // Default to Ethereum balance on page load
  updateBalance("ETH");

  // Update balance when the coin is changed
  coinSelect.addEventListener("change", function () {
    updateBalance(coinSelect.value);
  });

  // Redirect to make transaction page with selected coin
  makeTransactionBtn.addEventListener("click", function () {
    const selectedCoin = coinSelect.value; // Send the selected coin type
    window.location.href = `send-transaction.html?coin=${selectedCoin}`;
  });
  document.getElementById("logout-btn").addEventListener("click", function () {
    logoutUser();
  });
});
function logoutUser() {
  fetch("/wallet/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        sessionStorage.clear(); // Clear session and log out
        window.location.href = "index.html"; // Redirect to home page
      } else {
        return response.json().then((data) => {
          throw new Error(data.message || "Logout failed");
        });
      }
    })
    .catch((error) => {
      console.error("Logout Error:", error.message);
    });
}
