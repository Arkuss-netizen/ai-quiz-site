document.getElementById("quiz-form").addEventListener("submit", function (event) {
    event.preventDefault();

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
        q10: document.querySelector('input[name="q10"]:checked')?.value,
        q11: document.querySelector('input[name="q11"]:checked')?.value,
        q12: document.querySelector('input[name="q12"]:checked')?.value,
    };

    // Pārbauda vai visas atbildes aizpildītas
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

    // Rezultātu aprēķins
    let score = 0;
    if (answers.q1 === "real") score++;
    if (answers.q2 === "human") score++;
    if (answers.q3 === "ai") score++;
    if (answers.q4 === "ai") score++;
    if (answers.q5 === "ai") score++;
    if (answers.q6 === "real") score++;
    if (answers.q7 === "ai") score++;
    if (answers.q8 === "human") score++;
    if (answers.q9 === "real") score++;
    if (answers.q10 === "real") score++;
    if (answers.q11 === "ai") score++;
    if (answers.q12 === "human") score++;

    // Apvieno visas atbildes + rezultātu
    const formData = {
        ...answers,
        score: score
    };

    // Sūta uz Google Sheets caur Google Apps Script
    fetch('https://script.google.com/macros/s/AKfycbzccFgW3j6JGtKORgk9VmnJcAPzhkRmbboZNHiMiWZwOG4dN-kKUEtqW1Qils3obnns/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(formData)
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        alert(`Tavs rezultāts ir nosūtīts! Rezultāts: ${score} no 12`);
        document.getElementById("quiz-form").reset();
    })
    .catch(error => {
        console.error("Kļūda:", error);
        alert("Kaut kas nogāja greizi. Lūdzu, mēģini vēlreiz.");
    });
});
