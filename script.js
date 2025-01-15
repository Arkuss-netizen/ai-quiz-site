document.getElementById("quiz-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    // Collect answers
    const answers = {
        q1: document.querySelector('input[name="q1"]:checked')?.value,
        q2: document.querySelector('input[name="q2"]:checked')?.value,
        q3: document.querySelector('input[name="q3"]:checked')?.value
    };

    // Validate answers
    if (!answers.q1 || !answers.q2 || !answers.q3) {
        alert("Please answer all questions before submitting!");
        return;
    }

    // Calculate score (example scoring logic)
    let score = 0;
    if (answers.q1 === "ai") score++;
    if (answers.q2 === "human") score++;
    if (answers.q3 === "task2") score++;

    // Show results
    const resultText = document.getElementById("result-text");
    resultText.textContent = `You scored ${score} out of 3!`;

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
