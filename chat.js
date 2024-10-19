document.getElementById('chat-form').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent the form from refreshing the page
    
    const userInput = document.getElementById('user-input').value; // Get user input
    const messagesDiv = document.getElementById('messages'); // Container for messages

    // Display the user input in the chat
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
                'Authorization': 'Bearer sk-7PpvbPQSbZ9CzHYOGm1shyppX0XLO5xcH-oHUOWx2JT3BlbkFJZj52DMiyYboVy-13-Vd0KZsAAn07NOmEb_RSNZRqcA' // Replace with your OpenAI API key
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo", // You can use "gpt-4" if you have access
                messages: [{ role: "user", content: userInput }]
            })
        });

        const data = await response.json();
        
        // Check if the response contains choices
        if (data.choices && data.choices.length > 0) {
            const chatGptResponse = data.choices[0].message.content;

            // Display ChatGPT's response
            messagesDiv.innerHTML += `<p><strong>ChatGPT:</strong> ${chatGptResponse}</p>`;
        } else {
            messagesDiv.innerHTML += `<p><strong>Error:</strong> No response from ChatGPT.</p>`;
        }
    } catch (error) {
        // Handle any errors from the API call
        messagesDiv.innerHTML += `<p><strong>Error:</strong> There was an issue contacting ChatGPT. Please try again later.</p>`;
        console.error('Error fetching ChatGPT API:', error);
    } finally {
        // Re-enable the input field regardless of the outcome
        userInputField.disabled = false;
    }
});
