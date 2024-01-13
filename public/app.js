document.addEventListener('DOMContentLoaded', () => {
    const messageContainer = document.getElementById('messageContainer');
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');

    // Fetch and display messages
    fetch('/messages')
        .then(response => response.json())
        .then(messages => {
            messages.forEach(message => {
                const messageElement = document.createElement('div');
                messageElement.textContent = message;
                messageContainer.appendChild(messageElement);
            });
        });

    // Handle form submission
    messageForm.addEventListener('submit', event => {
        event.preventDefault();
        const message = messageInput.value;

        // Post message to server
        fetch('/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `message=${encodeURIComponent(message)}`,
        })
        .then(response => response.text())
        .then(responseText => {
            console.log(responseText);
            // Add message to the container
            const messageElement = document.createElement('div');
            messageElement.textContent = message;
            messageContainer.appendChild(messageElement);

            // Clear the input field
            messageInput.value = '';
        });
    });
});
