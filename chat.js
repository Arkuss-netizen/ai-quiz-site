document.getElementById('chat-form').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent the form from refreshing the page
    
    const userInput = document.getElementById('user-input').value;
    const messagesDiv = document.getElementById('messages');

    // Display the user input on the chat
    messagesDiv.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
    
    // Clear the input field and disable it while processing
    const userInputField = document.getElementById('user-input');
    userInputField.value = '';
    userInputField.disabled = true; // Disable input field

    // Make the API call to OpenAI
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer YOUR_API_KEY' // Uncomment this line and set the key securely
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo", // You can use "gpt-4" depending on your API access
                messages: [{ role: "user", content: userInput }]
            })
        });

        const data = await response.json();
        
        if (data.choices && data.choices.length > 0) {
            const chatGptResponse = data.choices[0].message.content;

            // Display ChatGPT's response
            messagesDiv.innerHTML += `<p><strong>ChatGPT:</strong> ${chatGptResponse}</p>`;
        } else {
            messagesDiv.innerHTML += `<p><strong>Error:</strong> No response from ChatGPT.</p>`;
        }
    } catch (error) {
        messagesDiv.innerHTML += `<p><strong>Error:</strong> There was an issue contacting ChatGPT. Please try again later.</p>`;
        console.error('Error fetching ChatGPT API:', error);
    } finally {
        // Re-enable the input field regardless of the outcome
        userInputField.disabled = false;
    }
});
