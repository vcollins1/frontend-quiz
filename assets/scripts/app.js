const selections = document.querySelectorAll(".quiz-banner--select");
const quizHeader = document.querySelector(".quiz-banner--header");
const question = document.querySelector(".question__current");
const answerSelections = document.querySelectorAll(".answer");
const curQuesNum = document.querySelector(".current");
const maxQuesNum = document.querySelector(".end");
const options = document.querySelectorAll(".answer__text > span");
const answerBtn = document.querySelector(".answer__btn");
const progressMeter = document.querySelector(".progress__meter");
const playAgain = document.querySelector(".play-again");
const toggleSwitch = document.querySelector(".toggle");
const toggleInput = document.querySelector(".toggle__input");
let numCorrect = 0;
let curNum = 1;
let maxNum;
let quiz;

let data;
fetch("./data.json").then(response => {
    return response.json();
}).then(object => {
    data = object["quizzes"];
    selections.forEach((selection, i) => {
        selection.querySelector(".quiz-banner__img").src = `${data[i]["icon"]}`;
        selection.querySelector(".quiz-banner__text").innerHTML = `${data[i]["title"]}`;
        selection.classList.add(`${data[i]["title"].toLowerCase()}`);

        selection.addEventListener("click", e => {
            document.querySelector(".menu").style.display = "none";

            if (e.target.classList.contains("html") || e.target.parentElement.classList.contains("html")) {
                loadQuestionPage(data[0])
            }

            if (e.target.classList.contains("css") || e.target.parentElement.classList.contains("css")) {
                loadQuestionPage(data[1])
            }

            if (e.target.classList.contains("javascript") || e.target.parentElement.classList.contains("javascript")) {
                loadQuestionPage(data[2])
            }

            if (e.target.classList.contains("accessibility") || e.target.parentElement.classList.contains("accessibility")) {
                loadQuestionPage(data[3])
            }
        });
    });
});

toggleSwitch.addEventListener("click", () => {
    if (toggleInput.checked) {
        document.body.classList.add("dark");
        document.querySelector(".sun").src = "./assets/images/icon-sun-light.svg";
        document.querySelector(".moon").src = "./assets/images/icon-moon-light.svg";
    } else {
        document.body.classList.remove("dark");
        document.querySelector(".sun").src = "./assets/images/icon-sun-dark.svg";
        document.querySelector(".moon").src = "./assets/images/icon-moon-dark.svg";
    }
})

answerSelections.forEach(selection => {
    selection.addEventListener("click", activeAns);
});

answerBtn.addEventListener("click", e => {
    if (e.target.classList.contains("next-question")) {
        answerBtn.classList.toggle("next-question");
        resetSelections();
        curNum += 1;
        if (curNum > maxNum) {

            if (quizHeader.classList.contains("html")) {
                quiz = data[0];
            }
        
            if (quizHeader.classList.contains("css")) {
                quiz = data[1];
            }
        
            if (quizHeader.classList.contains("javascript")) {
                quiz = data[2];
            }
        
            if (quizHeader.classList.contains("accessibility")) {
                quiz = data[3];
            }

            const head = document.querySelector(".quiz-banner--result");
            head.classList.add(quiz["title"].toLowerCase());
            head.querySelector(".quiz-banner__img").src = `${quiz["icon"]}`;
            head.querySelector(".quiz-banner__text").innerText = quiz["title"];
            document.querySelector(".mark").innerText = numCorrect;
            document.querySelector(".out-of span").innerText = maxNum;
            document.querySelector(".quiz").style.display = "none";
            document.querySelector(".result").style.display = "flex";

            return;
        }
        progressMeter.style.width = `${(curNum / maxNum) * 100}%`;

        if (quizHeader.classList.contains("html")) {
            updateQuestion(data[0]);
        }
    
        if (quizHeader.classList.contains("css")) {
            updateQuestion(data[1]);
        }
    
        if (quizHeader.classList.contains("javascript")) {
            updateQuestion(data[2]);
        }
    
        if (quizHeader.classList.contains("accessibility")) {
            updateQuestion(data[3]);
        }

        answerSelections.forEach(selection => {
            selection.addEventListener("click", activeAns);
        });

        answerBtn.innerText = "Submit Answer";
    } else {
        if (curNum > maxNum) {
            return;
        }

        let err;
        if (quizHeader.classList.contains("html")) {
            err = answerCheck(data[0]);
        }
    
        if (quizHeader.classList.contains("css")) {
            err = answerCheck(data[1]);
        }
    
        if (quizHeader.classList.contains("javascript")) {
            err = answerCheck(data[2]);
        }
    
        if (quizHeader.classList.contains("accessibility")) {
            err = answerCheck(data[3]);
        }

        if (!err)
            answerBtn.classList.toggle("next-question");
    }
});

playAgain.addEventListener("click", () => {
    document.querySelector(".menu").style.display = "flex";
    document.querySelector(".result").style.display = "none";
    quizHeader.classList.remove("html", "css", "accessibility", "javascript");
    quizHeader.querySelector(".quiz-banner__img").src = '';
    quizHeader.querySelector(".quiz-banner__text").innerText = '';
    document.querySelector(".quiz-banner--result").classList.remove("html", "css", "accessibility", "javascript");
    curNum = 1;
    numCorrect = 0;
    answerBtn.innerText = "Submit Answer";
    answerSelections.forEach(selection => {
        selection.addEventListener("click", activeAns);
    });
});

function activeAns(e) {

    /*
    Function to mark the current active answer selected
    */
    document.querySelector(".answer__active").classList.remove("answer__active");

    if (e.target.parentElement.classList.contains("answer"))
        e.target.parentElement.classList.add("answer__active");
    else if (e.target.parentElement.parentElement.classList.contains("answer"))
        e.target.parentElement.parentElement.classList.add("answer__active");
    else
        e.target.classList.add("answer__active");
}

function loadQuestionPage(quiz) {
    /*
        Loads the question page selected by tghe user from
        the main menu.
    */
    const head = document.querySelector(".quiz-banner--header");
    head.classList.add(quiz["title"].toLowerCase());
    head.querySelector(".quiz-banner__img").src = `${quiz["icon"]}`;
    head.querySelector(".quiz-banner__text").innerText = quiz["title"];
    maxQuesNum.innerHTML = quiz["questions"].length;
    maxNum = quiz["questions"].length;
    progressMeter.style.width = `${(curNum / maxNum) * 100}%`;
    document.querySelector(".quiz").style.display = "flex";

    updateQuestion(quiz);
}

function answerCheck(quiz) {
    /*
        Checks the users selected answer
    */
    const userAns = document.querySelector(".answer__active > .answer__text > span");
    const correctAns = quiz["questions"][curNum - 1]["answer"];
    if (userAns === null) {
        document.querySelector(".error").style.display = "flex";
        return true;
    } else {
        document.querySelector(".error").style.display = "none";
        answerSelections.forEach(selection => {
            selection.removeEventListener("click", activeAns);
        });
        if (correctAns === userAns.innerText) {
            numCorrect += 1;
            document.querySelector(".answer__active > .answer__text > img").src = "./assets/images/icon-correct.svg";
            document.querySelector(".answer__active").classList.add("correct");
        } else {
            document.querySelector(".answer__active > .answer__text > img").src = "./assets/images/icon-incorrect.svg";
            document.querySelector(".answer__active").classList.add("incorrect");
            document.querySelector(".right").src = "./assets/images/icon-correct.svg";
        }

        if (curNum >= maxNum)
            answerBtn.innerText = "Results";
        else
            answerBtn.innerText = "Next Question";
    }

    return false;
}

function resetSelections() {
    /*
        Resets the answer activity from the previous question
        before displaying the next question.
    */
    document.querySelector(".answer__active").classList.remove("incorrect");
    document.querySelector(".right").src = "";
    document.querySelector(".right").classList.remove("right");
    document.querySelector(".answer__active > .answer__text > img").src = "";
    document.querySelector(".answer__active").classList.remove("correct");
    document.querySelector(".answer__active").classList.remove("answer__active");
    document.querySelector("input[type=hidden]").classList.add("answer__active");
}

function updateQuestion(quiz) {
    /*
        Update question and displays answer options
    */
    curQuesNum.innerHTML = curNum;
    question.innerText = quiz["questions"][curNum - 1]["question"];

    const answers = quiz["questions"][curNum - 1]["options"];
    options.forEach((option, i) => {
        option.innerText = `${answers[i]}`;

        if (answers[i] === quiz["questions"][curNum - 1]["answer"])
            option.nextElementSibling.classList.add("right");
    });
}