// import (nameOfYourLiking) from "./(jsfile)"

const startBtn = document.querySelector(".start-btn")
const infoBox = document.querySelector(".info-box")
const exitBtn = infoBox.querySelector(".buttons .quit")
const continueBtn = infoBox.querySelector(".buttons .restart")
const quizBox = document.querySelector(".quiz-box")
const resultBox = document.querySelector(".result-box")
const restartQuiz = resultBox.querySelector(".buttons .restart")
const quitQuiz = resultBox.querySelector(".buttons .quit")
const optionsList = document.querySelector(".options-list")
const timeLine = document.querySelector("header .time-line")
const timeText = document.querySelector(".timer .timer-left")
const timeCount = document.querySelector(".timer .timer-sec")
const nextBtn = document.querySelector("footer .next-btn")
const bottomQuestionCounter = document.querySelector("footer .total-questions")


startBtn.addEventListener("click", (e) => {
    infoBox.classList.add("activeInfo");
})

exitBtn.addEventListener("click", (e) => {
    infoBox.classList.remove("activeInfo");
})

continueBtn.addEventListener("click", (e) =>{
    infoBox.classList.remove("activeInfo");
    quizBox.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
})

let timeValue = 15;
let queCount = 0;
let queNum = 1;
let userScore = 0;
let counter;
let counterLine; 
let widthValue = 0;

restartQuiz.addEventListener("click", (e) =>{
    quizBox.classList.add("activeQuiz");
    resultBox.classList.remove("activeResult");
    timeValue = 15; 
    queCount = 0;
    queNum = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(queCount);
    queCounter(queNum);
    clearInterval(counter)
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(widthValue);
    timeText.textContent = "Time Left";
    nextBtn.classList.remove("show")
})


quitQuiz.addEventListener("click", (e)=> {
    window.location.reload();//reload current window
})

nextBtn.addEventListener("click", (e) => {
    if(queCount < questions.length - 1){
        queCount++;
        queNum++;
        showQuestions(queCount);
        queCounter(queNum);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue)
        startTimerLine(widthValue);
        timeText.textContent = "Time Left"
        nextBtn.classList.remove("show")
    }else{
        clearInterval(counter);
        clearInterval(counterLine);
        showResult()
    }
})

function showQuestions(index){
    const queText = document.querySelector(".question-text")
    let queTag = "<span>" + questions[index].numb + 
    ". " + questions[index].question + "</span>";

    let optionTag = "";
    for(let i  = 0; i < questions.length; i++){
      optionTag +=  '<div class = "option"><span>'
    + questions[index].options[i]+"</span></div>"
    }
    
    queText.innerHTML = queTag;
    optionsList.innerHTML = optionTag;

    const option = optionsList.querySelectorAll(".option")

    for(i = 0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)")
    }
}


function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correcAns = questions[queCount].answer;
    const allOptions = optionsList.children.length;

    if(userAns == correcAns){
        userScore += 1;
        answer.classList.add("correct");
        console.log("Right answer")
    }else{
        answer.classList.add("incorrect");
        console.log("Wrong answer")

        for(i = 0; i < allOptions; i++){
            if(optionsList.children[i].textContent == correcAns){
                optionsList.children[i].setAttribute("class", "option correct");
            }
        }
    }
    for(i = 0; i < allOptions; i++){
        optionsList.children[i].classList.add("disabled")
    }
    nextBtn.classList.add("show");
}


function showResult(){
    infoBox.classList.remove("activeInfo");
    quizBox.classList.remove("activeQuiz");
    resultBox.classList.add("activeResult");
    const scoreText = resultBox.querySelector(".score-text");
    if(userScore > 3){
        let scoreTag = "<span>Congrats!, you got <p>" +
        userScore + "</p> out of <p>" + 
        questions.length + "</p></span>";
        scoreText.innerHTML = scoreTag;
    }else{
        let scoreTag = "<span>Nice, you got <p>" + 
        userScore + "</p> out of <p>" + 
        questions.length + "</p></span>";
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            // timeText.textContent = "Time Off";
            const allOptions = optionsList.children.length;
            let correctAns = questions[queCount].answer;
            for(i = 0; i < allOptions; i++){
                if(optionsList.children[i].textContent == correctAns){
                    optionsList.children[i].classList.add("correct")
                    console.log("Time gone: Auto selected correct answer");
                }
            }
            for(i = 0; i < allOptions; i++){
                optionsList.children[i].classList.add("disabled");
            }
        }
        nextBtn.classList.add("show");
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1;
        timeLine.style.width = time + "px";
        if(time > 549){
            clearInterval(counterLine);
        }
    }
}

function queCounter(index){
    let totalQueCountTag = "<span><p>" + index + "</p> of <p>" + questions.length + "</p> Questions</span>";
    bottomQuestionCounter.innerHTML = totalQueCountTag;
}