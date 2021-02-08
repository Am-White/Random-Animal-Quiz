// VARIABLES : INDEX.HTML
//Elements
var startBtn = document.querySelector("#startBtn");
var mainEl = document.querySelector("main");
var timeEl = document.querySelector("#timeCount");

//Timer variables
var timeLeft = 0;
var startTime = 75;
//Score
var score = 0;
//Questions
var questionEl;
var answerEl;
var endScore;

//Array of Q and A
var qAndA= [
    {
        question: "Which animal is monogamous and mates for life?",
        answers: ['Meerkats','Alligators','Seahorses'],
        rightAnswer: 'Seahorses'
    },
    {
        question: "Which bug has tiny hair on their eyes?",
        answers: ['Locusts','Honeybees','Dragonflies'],
        rightAnswer: 'Honeybees'
    },
    {
        question: "How many hours a day can a panda spend eating?",
        answers: ['2','12','14'],
        rightAnswer: '12'
    },
    {
        question: "What do butterflies taste with?",
        answers: ['Feet','Antennas','Bottom of Wings'],
        rightAnswer: 'Feet'
    },
    {
        question: "How long have alligators been around?",
        answers: ['50 million years','150 million years','250 million years'],
        rightAnswer: '150 million years'
    },
    {
        question: "How long can a Galapagos tortoise go without food or water?",
        answers: ['1 year','7 months','3 months'],
        rightAnswer: '1 year'
    },
    {
        question: "What is considered a cats unique `fingerprint`?",
        answers: ['Tongue','Nose pad','Little paw toes'],
        rightAnswer: 'Nose pad'
    },
    {
        question: "How many hearts does an Octopus have?",
        answers: ['1','2','3'],
        rightAnswer: '3'
    }
]

//START THE QUIZZZ!
function startQuiz() {
    //Start quiz with first question
    var questionIndex = 0;

    //Start timer
    startTimer();

    questionEl = document.createElement("h2");
    answerEl = document.createElement("ol");
    endScore = document.createElement("p");

    renderQuestions(questionIndex);
}

//START THE CLOCK!
function startTimer() {
    timeLeft = startTime;
    interval = setInterval(function() {
        if (timeLeft > 0) {
            timeLeft--;
            renderTime();
        } else {
            //Stop interval(timer) when timer ends
            clearInterval(interval);
            timeLeft = 0;
            renderTime();
            renderFinalScore();
        }
    }, 1000);
}

//Render time in #timeCount id in index.html
function renderTime() {
    timeEl.textContent = timeLeft;
}

//Render questions onto index.html
function renderQuestions(questionIndex) {
    mainEl.innerHTML = "";
    questionEl.innerHTML = "";
    answerEl.innerHTML = "";
    var listEl;
    var button;
    var results;

    if(questionIndex >= qAndA.length || timeLeft <= 0) {
        clearInterval(interval);
        renderFinalScore();
        return;
    }

    //Display Q and A in html
    questionEl.innerText = qAndA[questionIndex].question;
    mainEl.appendChild(questionEl);

    //Creates button options
    for (var i = 0; i < 3; i++) {
        listEl = document.createElement("li");
        listEl.setAttribute("data-index", i);

        button = document.createElement("button");
        button.textContent = qAndA[questionIndex].answers[i];
        listEl.appendChild(button);
        answerEl.appendChild(listEl);
    }
        mainEl.appendChild(answerEl);
        resultEl = document.createElement("p");
        mainEl.appendChild(resultEl);

        //When user clicks button
        answerEl.addEventListener("click", function(event) {
            event.preventDefault();
            var element = event.target;

            //Check if correct or incorrect
            if (element.matches("button") === true) {
                var answer = element.textContent;
                if (answer === qAndA[questionIndex].rightAnswer) {
                    resultEl.innerText= "Correct Answer";
                    score ++;
                } else {
                    resultEl.innerText = "Incorrect Answer";
                    timeLeft -= 5;
                }

                questionIndex++;
                setTimeout(function() {
                    renderQuestions(questionIndex);
                }, 1000);
            }
        }, {once: true});
    
}


function renderFinalScore() {
    // clear page
    mainEl.innerHTML = "";
    score = timeLeft;

    
    var titleEl = document.createElement('h1');
    titleEl.textContent = "All done!";
    mainEl.appendChild(titleEl);

    var paragraphEl = document.createElement('p');
    paragraphEl.textContent = "Your final score is: " + score;
    mainEl.appendChild(paragraphEl);

    var formEl = document.createElement("FORM");
    var labelEl = document.createElement("label");
    var inputEl = document.createElement('input');
    formEl.setAttribute('id', 'form');
    labelEl.innerHTML = "Enter Your Initials: ";
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("name", "initials");
    formEl.appendChild(labelEl);
    formEl.appendChild(inputEl);
    mainEl.appendChild(formEl);

    var btnEl = document.createElement('button');
    btnEl.id = "submit-ID";
    btnEl.textContent = "Submit";
    mainEl.appendChild(btnEl);

    
    btnEl.addEventListener('click', function(e) {
        e.preventDefault(); 

       
        var newInitials = inputEl.value;
        var myObject = {
            initials: newInitials, 
            score: score};
        
        // local storage
        if (localStorage.getItem("highScores") === null) {
            localStorage.setItem("highScores", JSON.stringify(myObject));
        } else {
            
            var hs = localStorage.getItem("highScores");
            var hsObject = JSON.parse(hs);
            var array = [];

            if(hsObject.length) {
                hsObject.map(item => array.push(item))
            } else {
                array.push(hsObject);
            }

            array.push(myObject);
            storedString = JSON.stringify(array);
            localStorage.setItem("highScores", storedString);
        }

        window.location.href = "high-scores.html";
    })
}






//LISTENER: Click start button > start quiz
startBtn.addEventListener("click", startQuiz);