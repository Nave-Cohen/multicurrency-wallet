document.addEventListener('DOMContentLoaded', function() {
    const mnemonicContainer = document.getElementById('mnemonic');
    const nextBtn = document.getElementById('next-btn');

    function showAlert(message) {
        document.getElementById('modalBody').textContent = message;
        var alertModal = new bootstrap.Modal(document.getElementById('alertModal'));
        alertModal.show();
    }

    // Fetch the mnemonic from the backend
    fetch('/wallet/generate-mnemonic')
        .then(response => response.json())
        .then(data => {
            mnemonicContainer.textContent = data.mnemonic;
        })
        .catch(error => {
            mnemonicContainer.textContent = 'Error generating mnemonic';
            console.error('Error:', error);
        });
        
    nextBtn.addEventListener('click', () => {
        const mnemonic = mnemonicContainer.textContent;

        fetch('/wallet/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mnemonic: mnemonic }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message && data.message.includes("Wallet created successfully")) {
                sessionStorage.setItem('walletAddress', data["wallet-address"]);
                window.location.href = '/public/wallet.html';
            } else {
                showAlert('Failed to create wallet. Reason: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showAlert('An error occurred while creating the wallet. Please try again.');
        });
        
    });
    document.getElementById('back-btn').addEventListener('click', function() {
        window.location.href = 'index.html';  
    });
});
