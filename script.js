// script.js
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Paris", "Rome", "Madrid"],
        answer: "Paris"
    },
    {
        question: "Which language is used for web development?",
        options: ["Python", "HTML", "C++", "Java"],
        answer: "HTML"
    },
    {
        question: "Which river flows through Hyderabad?",
        options: ["Godavari", "Krishna", "Musi", "Kaveri"],
        answer: "Musi"
    },
    {
        question: "Which famous monument is located in Hyderabad?",
        options: ["India Gate", "Gateway of India", "Charminar", "Qutub Minar"],
        answer: "Charminar"
    },
    {
        question: "What is the official language of Telangana?",
        options: ["Hindi", "Telugu", "Kannada", "Tamil"],
        answer: "Telugu"
    },
    {
        question: "Which dish is Hyderabad famous for?",
        options: ["Biryani", "Dosa", "Vada Pav", "Idli"],
        answer: "Biryani"
    }
];

const correctSound = new Audio('correct.mp3');
const wrongSound = new Audio('wrong.mp3');
const clickSound = new Audio('click.mp3');

function playClickSound() {
    clickSound.play();
}

function playResultSound(score, total) {
    if (score === total) {
        correctSound.play();
    } else {
        wrongSound.play();
    }
}

function loadQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = ''; // Clear previous content if reloaded
    quizData.forEach((q, index) => {
        const div = document.createElement('div');
        div.classList.add('quiz-question', 'fade-in');
        div.innerHTML = `
            <p>${index + 1}. ${q.question}</p>
            ${q.options.map(option => `
                <label>
                    <input type="radio" name="question${index}" value="${option}" onclick="playClickSound()"> ${option}
                </label><br>
            `).join('')}
        `;
        quizContainer.appendChild(div);
    });
}

function submitQuiz() {
    let score = 0;
    quizData.forEach((q, index) => {
        const selected = document.querySelector(`input[name="question${index}"]:checked`);
        if (selected && selected.value === q.answer) {
            score++;
        }
    });
    function showResult(score) {
  const resultEl = document.getElementById('quiz-result');
  resultEl.textContent = `Your Score: ${score}`;

  // Trigger pop animation
  resultEl.classList.add('pop');

  // Remove class after animation ends
  resultEl.addEventListener('animationend', () => {
    resultEl.classList.remove('pop');
  }, { once: true });

  // Optionally trigger confetti celebration here if you have that implemented
  celebrateConfetti();
}

    const resultEl = document.getElementById('quiz-result');
    resultEl.textContent = `You scored ${score} out of ${quizData.length}`;
    resultEl.classList.add('highlight');
    playResultSound(score, quizData.length);
    setTimeout(() => resultEl.classList.remove('highlight'), 2000);
}

async function fetchJoke() {
    const response = await fetch('https://official-joke-api.appspot.com/random_joke');
    const data = await response.json();
    const jokeEl = document.getElementById('joke');
    jokeEl.textContent = `${data.setup} - ${data.punchline}`;
    jokeEl.classList.add('fade-in');
    setTimeout(() => jokeEl.classList.remove('fade-in'), 1000);
}

// Load the quiz when the page loads
window.onload = loadQuiz;
