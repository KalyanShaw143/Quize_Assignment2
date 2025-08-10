function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const quizId = getQueryParam("id");
const quizData = JSON.parse(localStorage.getItem(quizId)); 

if (!quizData) {
    document.getElementById("quiz-container").innerHTML = "<p>Quiz not found.</p>";
} else {
    const container = document.getElementById("quiz-container");
    quizData.forEach((q, index) => {
        const div = document.createElement("div");
        div.classList.add("question-item");
        div.innerHTML = `
            <strong>Q${index + 1}: ${q.question}</strong><br>
            ${Object.keys(q.options).map(opt => `
                <label>
                    <input type="radio" name="q${index}" value="${opt}"> 
                    ${opt}: ${q.options[opt]}
                </label><br>
            `).join('')}
        `;
        container.appendChild(div);
    });

    document.getElementById("submitBtn").style.display = "block";
}

document.getElementById("submitBtn").addEventListener("click", () => {
    let score = 0;
    quizData.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected && selected.value === q.correct) {
            score++;
        }
    });
    document.getElementById("result").innerHTML = `<h3>You scored ${score} / ${quizData.length}</h3>`;
});