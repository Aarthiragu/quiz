const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Lisbon", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false }
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

function showQuestion() {
    resetState();
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.getElementById(`answer${index + 1}`);
        button.innerText = answer.text;
        button.dataset.correct = answer.correct;
        button.addEventListener('click', () => selectAnswer(button));
    });
}

function resetState() {
    document.getElementById('next-btn').style.display = 'none';
    const answerButtons = document.querySelectorAll('.btn');
    answerButtons.forEach(button => {
        button.classList.remove('correct');
        button.classList.remove('wrong');
        button.disabled = false;
    });
}

function selectAnswer(selectedButton) {
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('wrong');
    }
    Array.from(document.querySelectorAll('.btn')).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
    });
    document.getElementById('next-btn').style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `<h2>Your score: ${score} out of ${questions.length}</h2>`;
}

document.addEventListener('DOMContentLoaded', () => {
    showQuestion();
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
});
