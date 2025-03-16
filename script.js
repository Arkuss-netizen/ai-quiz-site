document.getElementById("quiz-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const answers = {};
    for (let i = 1; i <= 12; i++) {
        answers[`q${i}`] = document.querySelector(`input[name="q${i}"]:checked`)?.value;
    }

    const unanswered = [];
    for (const question in answers) {
        if (!answers[question]) {
            unanswered.push(question);
        }
    }

    if (unanswered.length > 0) {
        alert(`Lūdzu atbildiet uz visiem jautājumiem. Jūs palaidāt garām: ${unanswered.join(", ")}`);
        return;
    }

    let score = 0;
    const correctAnswers = {
        q1: "real", q2: "real", q3: "ai", q4: "ai",
        q5: "ai", q6: "real", q7: "ai", q8: "real",
        q9: "real", q10: "real", q11: "ai", q12: "ai"
    };

    for (const question in answers) {
        if (answers[question] === correctAnswers[question]) score++;
    }

    const formData = { ...answers, score: score };

    fetch('https://script.google.com/macros/s/AKfycby-HtFqNSytb30WeXgBUM1AqmqfKL6tMUI6YD_unHiQ3AzqdAEqhp3KclhP6gxV5ffy/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData)
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        alert("Tavs rezultāts ir nosūtīts, paldies par dalību!");

        let feedback = "";
        if (score === 12) feedback = "Perfekts darbs!";
        else if (score >= 9) feedback = "Tak tik turēt!";
        else if (score >= 6) feedback = "Labs darbs, bet ir kur tiekties.";
        else feedback = "Es redzu, esi centies. Varbūt pamēģini vēlreiz!";

        document.getElementById("result-text").innerHTML = `Tavs rezultāts: ${score} no 12!<br>${feedback}`;
        document.getElementById("quiz-form").classList.add("hidden");
        document.getElementById("result").classList.remove("hidden");
    })
    .catch(error => {
        console.error("Kļūda:", error);
        alert("Radās kļūda, mēģini vēlreiz!");
    });
});
