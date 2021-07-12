// declaração de varaveis

const question          = document.querySelector("#question");
const answersBox        = document.querySelector("#answers-box");
const quizzContainer    = document.querySelector("#quizz-container");
const scoreContainer    = document.querySelector("#score-container");
const letters           = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;


//Perguntas 
const questions = [
    {
      "question": "PHP foi desenvolvido para qual fim?",
      "answers": [
        {
          "answer": "back-end",
          "correct": true
        },
        {
          "answer": "front-end",
          "correct": false
        },
        {
          "answer": "Sistema operacional",
          "correct": false
        },
        {
          "answer": "Banco de dados",
          "correct": false
        },
      ]
    },
    {
      "question": "Uma forma de declarar variável em JavaScript:",
      "answers": [
        {
          "answer": "$var",
          "correct": false
        },
        {
          "answer": "var",
          "correct": true
        },
        {
          "answer": "@var",
          "correct": false
        },
        {
          "answer": "#let",
          "correct": false
        },
      ]
    },
    {
      "question": "Qual o seletor de id no CSS?",
      "answers": [
        {
          "answer": "#",
          "correct": true
        },
        {
          "answer": ".",
          "correct": false
        },
        {
          "answer": "@",
          "correct": false
        },
        {
          "answer": "/",
          "correct": false
        },
      ]
    },
]
  
//substituição do quizz para a primeira pergunta
function init() {
    //criar primeira pegunta 
    createQuestion(0);
}

//cria uma pergunta
function createQuestion(i) {
    
    //limpar a questão anterior
    const oldButtons = answersBox.querySelectorAll("button");
    
    oldButtons.forEach(function(btn) {
        btn.remove();
    });

    //alterar o texto da pergunta
    const questionText = question.querySelector("#question-text");
    const questionNumber = question.querySelector("#question-number");

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    //alterando as alternativas
    questions[i].answers.forEach(function(answer, i) {

        //cria o template do quizz
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);
        const letterBtn = answerTemplate.querySelector(".btn-letter");
        const answerText = answerTemplate.querySelector(".question-answer");

        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer'];

        answerTemplate.setAttribute("correct-answer", answer["correct"]);

        //removendo classes que nao precisamos 
        answerTemplate.classList.remove("hide");
        answerTemplate.classList.remove("answer-template");

        //inserir alternativas na tela
        answersBox.appendChild(answerTemplate);

        //inserindo evento de click nos botoes
        answerTemplate.addEventListener("click", function() {
            checkAnswer(this);
        });

    });

    //incrementar o numero da questao
    actualQuestion++;

}

function checkAnswer(btn) {
    
    //seleciona todos os botoes
    const buttons = answersBox.querySelectorAll("button");

    //verifica se acertou ou errou
    buttons.forEach(function(button) {
        if(button.getAttribute("correct-answer") === "true") {
            button.classList.add("correct-answer");

            //checar se usuario acertou ou nao
            if(btn === button) {
                //incrementando dos pontos
                points++;
            }

        } else {
            button.classList.add("wrong-answer");
        }
    });

     //exibir proxima pergunra
     nextQuestion();

}

//exibe a proxima pergunta do quizz
function nextQuestion () {

    //timer para usuario ver a resposta
    setTimeout(function() {
        //verifica se ainda ha perguntas
        if(actualQuestion >= questions.length) {
            
            //apresentar msg de sucesso
            showSuccesMessage();
            return;
        }

        createQuestion(actualQuestion);
    }, 500);

}

//exibe a tela final
function showSuccesMessage() {

    hideOrShowQuizz();

    //trocar dados da tela de sucesso

    //calcular score
    const score = ((points / questions.length) * 100).toFixed(2);

    const displayScore = document.querySelector("#display-score span");
    displayScore.textContent = score.toString();

    //alterar o numero de perguntas corretas
    const correctAnswers = document.querySelector("#correct-answers");
    correctAnswers.textContent = points;


    //alterar o total de perguntas
    const totalQuestions = document.querySelector("#question-qty");
    totalQuestions.textContent = questions.length;
}

//mostra ou esconde o score
function hideOrShowQuizz () {
    quizzContainer.classList.toggle("hide");
    scoreContainer.classList.toggle("hide");
}

//reiniciar quizz
const restatBtn = document.querySelector("#restart");
restatBtn.addEventListener("click", function() {

    //zerar o jogo
    actualQuestion = 0;
    points = 0;
    hideOrShowQuizz();
    init();

});

//inicialização do quizz
init();