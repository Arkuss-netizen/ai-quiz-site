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
        q7: document.querySelector('input[name="q7"]:checked')?.value,
        q8: document.querySelector('input[name="q8"]:checked')?.value,
        q9: document.querySelector('input[name="q9"]:checked')?.value
    };

    // Validate answers
    const unanswered = [];
    for (const question in answers) {
        if (!answers[question]) {
            unanswered.push(question);
        }
    }

    if (unanswered.length > 0) {
        alert(`Lūdzu atbildiet uz visiem jautājumiem. Jūs palaidat garām: ${unanswered.join(", ")}`);
        return;
    }

    // Send answers to Google Sheets via Google Apps Script
    const formData = new FormData();
    for (const [key, value] of Object.entries(answers)) {
        formData.append(key, value);
    }

    // Replace with your Google Apps Script URL
    const googleAppsScriptUrl = "https://script.google.com/macros/s/AKfycbyXFZWjI6gIaLJTa5rxFErQUODz8pGFH4o4MNU49BqtM00yaRhVnTA0IzgX_Pncp8jw/exec";

    fetch(googleAppsScriptUrl, {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        console.log("Form submitted successfully:", data);
    })
    .catch(error => {
        console.error("Error submitting form:", error);
    });

    // Calculate score (example scoring logic)
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
        feedback = "Perfekts darbs !";
    } else if (score >= 7) {
        feedback = "Tak tik turēt !";
    } else if (score >= 4) {
        feedback = "Labs darbs, bet ir kur tiekties .";
    } else {
        feedback = "Es redzu esi centies, varbūt pamēģini velreiz  !";
    }

    // Show results
    const resultText = document.getElementById("result-text");
    resultText.innerHTML = `Tavs rezultats  ${score} no 9 !<br>${feedback}`;

    // Hide quiz and show result
    document.getElementById("quiz-form").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");
});
