let quizData = JSON.parse(localStorage.getItem("quizData")) || [];

function addQuestion() {
    let question = document.getElementById("questionText").value.trim();
    let optionA = document.getElementById("optionA").value.trim();
    let optionB = document.getElementById("optionB").value.trim();
    let optionC = document.getElementById("optionC").value.trim();
    let optionD = document.getElementById("optionD").value.trim();
    let correct = document.getElementById("correctAnswer").value;

    if (!question || !optionA || !optionB || !optionC || !optionD || !correct) {
        alert("Please fill in all fields.");
        return;
    }

    let newQuestion = {
        question,
        options: { A: optionA, B: optionB, C: optionC, D: optionD },
        correct
    };

    quizData.push(newQuestion);
    localStorage.setItem("quizData", JSON.stringify(quizData));

    displayQuestions();

    // Clear form
    document.getElementById("questionText").value = "";
    document.getElementById("optionA").value = "";
    document.getElementById("optionB").value = "";
    document.getElementById("optionC").value = "";
    document.getElementById("optionD").value = "";
    document.getElementById("correctAnswer").value = "";
}

function displayQuestions() {
    let list = document.getElementById("questionList");
    list.innerHTML = "";
    quizData.forEach((q, index) => {
        let div = document.createElement("div");
        div.className = "question-item";
        div.id = "qn-container";
        div.innerHTML = `<strong>Q${index + 1}:</strong> ${q.question} <br>
                A: ${q.options.A} | B: ${q.options.B} | C: ${q.options.C} | D: ${q.options.D} <br>
                <em>Correct Answer:</em> ${q.correct}`;
        let btn = document.createElement("button");
        btn.innerText="Delete";
        btn.onclick = function () {
            deleteQuestion(index);
        };

        div.appendChild(btn);
        list.appendChild(div);     
    });
}

// Load saved questions on page load
displayQuestions();


// Delete function to delete question
function deleteQuestion(index) {
    quizData.splice(index, 1);
    localStorage.setItem("quizData", JSON.stringify(quizData));
    displayQuestions();
}


// Generate link for quiz

function generateQuizId() {
    return 'quiz_' + Math.random().toString(36).substr(2, 9);
}

function generateLink() {
    if (quizData.length === 0) {
        alert("Add at least one question before saving!");
        return;
    }

    const quizId = generateQuizId();
    console.log(quizId);
    localStorage.setItem(quizId, JSON.stringify(quizData));

    const shareLink = `${window.location.origin}/quiz_play.html?id=${quizId}`;

    alert("Quiz Saved! Share this link:\n" + shareLink);

    // Optional: Display link on page
    const linkDiv = document.createElement("div");
    linkDiv.innerHTML = `<p><strong>Share this Quiz:</strong> 
    <a href="${shareLink}" target="_blank">${shareLink}</a></p>`;
    document.body.appendChild(linkDiv);
}

