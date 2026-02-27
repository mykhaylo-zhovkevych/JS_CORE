const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startButton = document.getElementById('start-button');
const questionText = document.getElementById('question-text');

const answersContainer = document.getElementById('answers-container');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionSpan = document.getElementById('total-questions');
const scoreSpan =  document.getElementById('score');

const finalScoreSpan = document.getElementById('final-score');
const maxScoreSpan = document.getElementById('max-score');

const resultMessage = document.getElementById('result-message');
const restartButton = document.getElementById('restart-btn');

const progressBar = document.getElementById('progress');


const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }
        ],
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Mercury", correct: false }
        ],
    },
    {
        question: "What is 7 x 8?",
        answers: [
            { text: "54", correct: false },
            { text: "56", correct: true },
            { text: "64", correct: false },
            { text: "58", correct: false }
        ],
    },
    {
        question: "Which language runs in the browser?",
        answers: [
            { text: "Python", correct: false },
            { text: "C#", correct: false },
            { text: "JavaScript", correct: true },
            { text: "Java", correct: false }
        ],
    },
    {
        question: "How many days are there in a leap year?",
        answers: [
            { text: "365", correct: false },
            { text: "364", correct: false },
            { text: "366", correct: true },
            { text: "367", correct: false }
        ],
    },
]

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', restartQuiz);

function startQuiz() {
    // reset vars
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = score;

    startScreen.classList.remove('active');
    quizScreen.classList.add('active');

    showQuestion();
}


function showQuestion() {
    // reset state
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + '%';

    questionText.textContent = currentQuestion.question;

    answersContainer.innerHTML = '';

    currentQuestion.answers.forEach((answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('answer-btn');

        // Dataset property that allows store own(custom) data
        button.dataset.correct = answer.correct;
        button.addEventListener('click', selectAnswer);

        answersContainer.appendChild(button);
    }))
}

function selectAnswer(e) {
    if (answersDisabled) return;

    answersDisabled = true;
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';

    Array.from(answersContainer.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        } else if (button === selectedBtn) {
            button.classList.add('incorrect');
        }
    });

    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    // Game logic
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1000);
    
}

function showResult() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');

    finalScoreSpan.textContent = score;

    if (score === quizQuestions.length) {
        resultMessage.textContent = "Perfect! You got all questions right";
    } else if (score > quizQuestions.length / 2) {
        resultMessage.textContent = "Good job! You got more than half of the questions right";
    } else {
        resultMessage.textContent = "Better luck next time! Keep practicing";
    }
}

function restartQuiz() {
    resultScreen.classList.remove('active');

    startQuiz();
}
