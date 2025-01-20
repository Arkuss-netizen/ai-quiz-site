document.getElementById("quiz-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    // Collect answers
    const answers = {
        q1: document.querySelector('input[name="q1"]:checked')?.value,
        q2: document.querySelector('input[name="q2"]:checked')?.value,
        q3: document.querySelector('input[name="q3"]:checked')?.value,
        q4: document.querySelector('input[name="q4"]:checked')?.value,
        q5: document.querySelector('input[name="q5"]:checked')?.value,
        q6: document.querySelector('input[name="q6"]:checked')?.value,
        q6: document.querySelector('input[name="q7"]:checked')?.value,
        q6: document.querySelector('input[name="q8"]:checked')?.value,
        q6: document.querySelector('input[name="q9"]:checked')?.value
    };

    // Validate answers
    if (!answers.q1 || !answers.q2 || !answers.q3 || !answers.q4 || !answers.q5 || !answers.q6 || !answers.q7 || !answers.q8 || !answers.q9) {
        alert("Please answer all questions before submitting!");
        return;
    }

    // Calculate score (example scoring logic)
    let score = 0;
    if (answers.q1 === "human") score++;
    if (answers.q2 === "ai") score++;
    if (answers.q3 === "ai") score++;
    if (answers.q4 === "human") score++;
    if (answers.q5 === "ai") score++;
    if (answers.q6 === "human") score++;
    if (answers.q7 === "human") score++;
    if (answers.q8 === "ai") score++;
    if (answers.q9 === "ai") score++;

    // Show results
    const resultText = document.getElementById("result-text");
    resultText.textContent = `You scored ${score} out of 9!`;

    // Hide quiz and show result
    document.getElementById("quiz-form").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");
});

function restartQuiz() {
    // Reset the form
    document.getElementById("quiz-form").reset();

    // Hide result and show quiz
    document.getElementById("result").classList.add("hidden");
    document.getElementById("quiz-form").classList.remove("hidden");
}
