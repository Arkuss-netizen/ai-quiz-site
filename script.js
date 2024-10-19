const questions = [
    {
        type: 'image',
        content: '1.jpg', // Add the path to your image here
        correctAnswer: 'real',
    },
    {
        type: 'text',
        content: 'This is a sample text generated by an AI.', // Add AI or real text here
        correctAnswer: 'ai',
    },
    {
        type: 'audio',
        content: 'path/to/your/audio1.mp3', // Add path to your audio here
        correctAnswer: 'real',
    },
];

let currentQuestion = 0;
let score = 0;

window.onload = function() {
    loadQuestion();
};

function loadQuestion() {
    const questionElement = document.getElementById('quizContent');
    const questionNumberElement = document.getElementById('questionNumber');

    questionNumberElement.textContent = currentQuestion + 1;

    const question = questions[currentQuestion];

    if (question.type === 'image') {
        questionElement.innerHTML = `<img src="${question.content}" alt="Question Image" class="quizImage">`;
    } else if (question.type === 'text') {
        questionElement.innerHTML = `<p>${question.content}</p>`;
    } else if (question.type === 'audio') {
        questionElement.innerHTML = `<audio controls><source src="${question.content}" type="audio/mpeg">Your browser does not support the audio tag.</audio>`;
    }
}

function submitAnswer(answer) {
    if (answer === questions[currentQuestion].correctAnswer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        localStorage.setItem('score', score);
        window.location.href = 'result.html'; // Redirect to the results page
    }
}
