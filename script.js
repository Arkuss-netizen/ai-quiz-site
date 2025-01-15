document.getElementById('submit-quiz').addEventListener('click', function() {
    const resultsDiv = document.getElementById('quiz-results');
    let score = 0;

    // Question 1 (Image): Correct answer is "AI"
    const q1Answer = document.querySelector('input[name="q1"]:checked');
    if (q1Answer && q1Answer.value === 'AI') {
        score++;
    }

    // Question 2 (Audio): Correct answer is "AI"
    const q2Answer = document.querySelector('input[name="q2"]:checked');
    if (q2Answer && q2Answer.value === 'AI') {
        score++;
    }

    // Display results
    let resultMessage = '';
    if (score === 2) {
        resultMessage = 'Great job! You got both questions correct!';
    } else if (score === 1) {
        resultMessage = 'Not bad! You got 1 out of 2 correct.';
    } else {
        resultMessage = 'Keep practicing! You didn’t get any answers right this time.';
    }

    resultsDiv.innerHTML = `<p>Your score: ${score}/2</p><p>${resultMessage}</p>`;
});
