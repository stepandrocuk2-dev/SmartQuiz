document.addEventListener('DOMContentLoaded', () => {

    const questions = [
        {
            question: "What is the plural of 'child'?",
            answers: ["Childs", "Children", "Childes", "Child"],
            correct: 1
        },
        {
            question: "Choose the correct form: She ___ to school every day.",
            answers: ["go", "going", "goes", "gone"],
            correct: 2
        },
        {
            question: "What is the past tense of 'eat'?",
            answers: ["Eated", "Ate", "Eaten", "Eating"],
            correct: 1
        },
        {
            question: "What is the opposite of 'big'?",
            answers: ["Tall", "Long", "Small", "Wide"],
            correct: 2
        },
        {
            question: "Choose the correct article: I have ___ apple.",
            answers: ["a", "an", "the", "no article"],
            correct: 1
        },
        {
            question: "What is the meaning of 'beautiful'?",
            answers: ["Гарний", "Сумний", "Швидкий", "Голодний"],
            correct: 0
        },
        {
            question: "They ___ playing football now.",
            answers: ["is", "am", "are", "be"],
            correct: 2
        },
        {
            question: "What is the past tense of 'go'?",
            answers: ["Goed", "Gone", "Went", "Going"],
            correct: 2
        },
        {
            question: "Which word is a colour?",
            answers: ["Table", "Blue", "Run", "Happy"],
            correct: 1
        },
        {
            question: "Choose the correct sentence.",
            answers: [
                "He don't like milk.",
                "He doesn't likes milk.",
                "He doesn't like milk.",
                "He not like milk."
            ],
            correct: 2
        }
    ];

    const startScreen = document.querySelector('#start-screen');
    const quizScreen = document.querySelector('#quiz-screen');
    const resultScreen = document.querySelector('#result-screen');

    const startBtn = document.querySelector('#start-btn');
    const restartBtn = document.querySelector('#restart-btn');

    const questionText = document.querySelector('#question-text');
    const answersContainer = document.querySelector('#answer-container');
    const timerDisplay = document.querySelector('#timer');
    const scoreDisplay = document.querySelector('#score-display');
    const resultText = document.querySelector('.result-text');

    let questionIndex = 0;
    let score = 0;
    let timer = 15;
    let interval;

    function showQuestion() {
        clearInterval(interval);

        if (questionIndex >= questions.length) {
            showResults();
            return;
        }

        timer = 15;
        timerDisplay.innerText = `Час: ${timer}с`;
        scoreDisplay.innerText = `Бали: ${score}`;

        const question = questions[questionIndex];

        questionText.innerText = question.question;
        answersContainer.innerHTML = '';

        question.answers.forEach((answer, i) => {
            const button = document.createElement('button');

            button.innerText = answer;
            button.classList.add('answer-btn');

            button.addEventListener('click', () => {
                checkAnswer(button, i);
            });

            answersContainer.appendChild(button);
        });

        startTimer();
    }

    function startTimer() {
        clearInterval(interval);

        interval = setInterval(() => {
            timer--;
            timerDisplay.innerText = `Час: ${timer}с`;

            if (timer <= 0) {
                clearInterval(interval);
                questionIndex++;
                showQuestion();
            }
        }, 1000);
    }

    
function checkAnswer(button, answerIndex) {
    clearInterval(interval);

    const correctAnswer = questions[questionIndex].correct;
    const buttons = answersContainer.querySelectorAll('.answer-btn');

    buttons.forEach(btn => {
        btn.disabled = true;
    });

    if (answerIndex === correctAnswer) {
        score++;
        button.classList.add('correct');
    } else {
        button.classList.add('wrong');
    }

    scoreDisplay.innerText = `Бали: ${score}`;

    setTimeout(() => {
        questionIndex++;
        showQuestion();
    }, 1000);
}


    function showResults() {
        clearInterval(interval);

        quizScreen.classList.add('hide');
        resultScreen.classList.remove('hide');

        resultText.innerText =
            `Твій результат: ${score} з ${questions.length}!`;
    }

    function startGame() {
        clearInterval(interval);

        questionIndex = 0;
        score = 0;

        startScreen.classList.add('hide');
        resultScreen.classList.add('hide');
        quizScreen.classList.remove('hide');

        showQuestion();
    }

    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);

});
