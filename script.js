const questions = [
    {
        question: "Which of the following is the capital of Arunanchal Pradesh?",
        answers: [
            { text: "Itanagar", correct: true},
            { text: "Dispur", correct: false},
            { text: "Imphal", correct: false},
            { text: "Panaji", correct: false},
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false},
            { text: "Australia", correct: true},
            { text: "Arctic", correct: false},
            { text: "Afria", correct: false},
        ]
    },
    {
        question: "What is the state flower of Haryana?",
        answers: [
            { text: "Lotus", correct: true},
            { text: "Sunflower", correct: false},
            { text: "Lily", correct: false},
            { text: "Rose", correct: false},
        ]
    },
    {
        question: "In which following state the main language is khasi?",
        answers: [
            { text: "Mizoram", correct: false},
            { text: "Nagaland", correct: false},
            { text: "Meghalaya", correct: true},
            { text: "Tripura", correct: false},
        ]
    },
    {
        question: "Which is the largest desert in th world?",
        answers: [
            { text: "Antartica", correct: false},
            { text: "kalahari", correct: false},
            { text: "Gobi", correct: false},
            { text: "Sahara", correct: true},
        ]
    },
    {
        question: "In which state of India is the elephant falls located?",
        answers: [
            { text: "Mizoram", correct: false},
            { text: "Manipur", correct: false},
            { text: "Meghalaya", correct: true},
            { text: "Odissa", correct: false},
        ]
    },
    {
        question: "What country has the highest life expectancy??",
        answers: [
            { text: "Japan", correct: false},
            { text: "Rome", correct: false},
            { text: "Hong Kong", correct: true},
            { text: "USA", correct: false},
        ]
    },
    {
        question: "Which planet in the Milky Way is the hottest?",
        answers: [
            { text: "Mercury", correct: false},
            { text: "Sun", correct: false},
            { text: "Venus", correct: true},
            { text: "Jupiter", correct: false},
        ]
    },{
        question: "What country drinks the most coffee per capita?",
        answers: [
            { text: "Sweden", correct: false},
            { text: "Poland", correct: false},
            { text: "Norway", correct: false},
            { text: "Finland", correct: true},
        ]
    },
    {
        question: "Who was the Ancient Greek God of the Sun?",
        answers: [
            { text: "Apollo", correct: true},
            { text: "Zeus", correct: false},
            { text: "Ares", correct: false},
            { text: "Demeter", correct: false},
        ]
    }
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click" ,()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();