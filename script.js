// Initialize or fetch history from localStorage
let answerHistory = JSON.parse(localStorage.getItem("answerHistory")) || [];

document.getElementById("quiz-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    // Collect answers
    const answers = {
        q1: document.querySelector('input[name="q1"]:checked')?.value,
        q2: document.querySelector('input[name="q2"]:checked')?.value,
        q3: document.querySelector('input[name="q3"]:checked')?.value,
        q4: document.querySelector('input[name="q4"]:checked')?.value,
        q5: document.querySelector('input[name="q5"]:checked')?.value,
        q6: document.querySelector('input[name="q6"]:checked')?.value,
        q7: document.querySelector('input[name="q7"]:checked')?.value,
        q8: document.querySelector('input[name="q8"]:checked')?.value,
        q9: document.querySelector('input[name="q9"]:checked')?.value,
    };

    // Validate answers
    const unanswered = [];
    for (const question in answers) {
        if (!answers[question]) {
            unanswered.push(question);
        }
    }

    if (unanswered.length > 0) {
        alert(`Please answer all questions! You missed: ${unanswered.join(", ")}`);
        return;
    }

    // Calculate score
    let score = 0;
    if (answers.q1 === "real") score++;
    if (answers.q2 === "ai") score++;
    if (answers.q3 === "ai") score++;
    if (answers.q4 === "real") score++;
    if (answers.q5 === "ai") score++;
    if (answers.q6 === "real") score++;
    if (answers.q7 === "real") score++;
    if (answers.q8 === "ai") score++;
    if (answers.q9 === "task2") score++;

    // Provide feedback based on score
    let feedback = "";
    if (score === 9) {
        feedback = "Excellent work!";
    } else if (score >= 7) {
        feedback = "Great job!";
    } else if (score >= 4) {
        feedback = "Good effort, but there's room for improvement.";
    } else {
        feedback = "Needs improvement. Try again!";
    }

    // Add current answers and score to history
    const submission = {
        answers: { ...answers },
        score: score,
        timestamp: new Date().toLocaleString(),
    };
    answerHistory.push(submission);
    localStorage.setItem("answerHistory", JSON.stringify(answerHistory));

    // Show results
    const resultText = document.getElementById("result-text");
    resultText.innerHTML = `You scored ${score} out of 9!<br>${feedback}<br><br><strong>Your Answers:</strong><br>`;
    for (const question in answers) {
        resultText.innerHTML += `${question.toUpperCase()}: ${answers[question]}<br>`;
    }

    // Hide quiz and show result
    document.getElementById("quiz-form").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");

    // Update history display
    displayHistory();
});

function restartQuiz() {
    // Reset the form
    document.getElementById("quiz-form").reset();

    // Hide result and show quiz
    document.getElementById("result").classList.add("hidden");
    document.getElementById("quiz-form").classList.remove("hidden");
}

function displayHistory() {
    const historyContainer = document.getElementById("history");
    historyContainer.innerHTML = "<h3>Answer History</h3>";

    if (answerHistory.length === 0) {
        historyContainer.innerHTML += "<p>No submissions yet.</p>";
        return;
    }

    // Display each submission
    answerHistory.forEach((entry, index) => {
        historyContainer.innerHTML += `
            <div class="history-entry">
                <strong>Submission #${index + 1} (${entry.timestamp})</strong><br>
                Score: ${entry.score}/9<br>
                Answers:<br>
                ${Object.entries(entry.answers)
                    .map(([key, value]) => `${key.toUpperCase()}: ${value}`)
                    .join("<br>")}
                <hr>
            </div>
        `;
    });
}

// Display history on page load
displayHistory();
