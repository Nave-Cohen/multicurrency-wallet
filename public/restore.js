document.addEventListener("DOMContentLoaded", function () {
  const nextBtn = document.getElementById("next-btn");

  nextBtn.addEventListener("click", () => {
    const mnemonic = getMnemonicFromInputs();

    // Check if the mnemonic contains exactly 12 words (this is more for precaution)
    if (!mnemonic) {
      return;
    }

    fetch("/wallet/restore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mnemonic: mnemonic }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (
          data.message &&
          data.message.includes("Wallet restored successfully")
        ) {
          sessionStorage.setItem("walletAddress", data["wallet-address"]);
          window.location.href = "./wallet.html";
        } else {
          showAlert(
            "Failed to restore wallet. Please check your mnemonic phrase."
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        showAlert(
          "An error occurred while restoring the wallet. Please try again."
        );
      });
  });

  // Back button functionality
  document.getElementById("back-btn").addEventListener("click", function () {
    window.location.href = "index.html";
  });
});
function showAlert(message) {
  document.getElementById("modalBody").textContent = message;
  var alertModal = new bootstrap.Modal(document.getElementById("alertModal"));
  alertModal.show();
}
function getMnemonicFromInputs() {
  let mnemonicArray = [];

  // Loop through the 12 input fields
  for (let i = 1; i <= 12; i++) {
    const word = document.getElementById(`mnemonic-word-${i}`).value.trim();

    // Check if any input is empty
    if (!word) {
      showAlert(`Word ${i} is missing! Please fill in all 12 words.`);
      return;
    }

    // Add the word to the array
    mnemonicArray.push(word);
  }

  // Join the array into a single string, separating words with spaces
  const mnemonicString = mnemonicArray.join(" ");
  console.log("Mnemonic:", mnemonicString);
  return mnemonicString; // You can return the string for further use
}

function addMnemonicInputs() {
  const container = document.getElementById("input-container");
  let inputHtml = '<div class="row">';

  for (let i = 1; i <= 12; i++) {
    inputHtml += `
            <div class="col-3 mb-2">
                <input type="text" class="form-control" id="mnemonic-word-${i}" placeholder="Word ${i}">
            </div>
        `;
  }
  inputHtml += "</div>";
  container.innerHTML = inputHtml;
}

async function pasteMnemonic() {
  try {
    // Get text from the clipboard
    const mnemonicString = await navigator.clipboard.readText();

    if (!mnemonicString) {
      showAlert("Clipboard is empty or does not contain valid text.");
      return;
    }

    // Split the mnemonic string into individual words
    const mnemonicWords = mnemonicString.trim().split(/\s+/);

    if (mnemonicWords.length !== 12) {
      showAlert("Mnemonic should contain exactly 12 words.");
      return;
    }

    // Fill the input fields with the mnemonic words
    for (let i = 1; i <= 12; i++) {
      const input = document.getElementById(`mnemonic-word-${i}`);
      if (input) {
        input.value = mnemonicWords[i - 1];
      }
    }
  } catch (err) {
    console.error("Failed to read from clipboard: ", err);
    showAlert(
      "Unable to read from clipboard. Make sure clipboard access is allowed."
    );
  }
}
addMnemonicInputs();
