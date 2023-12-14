const selections = document.querySelectorAll(".quiz-banner--select");
const quizHeader = document.querySelector(".quiz-banner--header");
const question = document.querySelector(".question__current");
const answerSelections = document.querySelectorAll(".answer");
const curQuesNum = document.querySelector(".current");
const maxQuesNum = document.querySelector(".end");
const options = document.querySelectorAll(".answer__text > span");
const answerBtn = document.querySelector(".answer__btn");
let curNum = 2;
let maxNum;

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

answerSelections.forEach(selection => {
    selection.addEventListener("click", activeAns);
});

answerBtn.addEventListener("click", e => {
    if (quizHeader.classList.contains("html")) {
        const correctAns = data[0]["questions"][curNum - 1]["answer"];
        const userAns = document.querySelector(".answer__active > .answer__text > span");
        if (userAns === null) {
            document.querySelector(".error").style.display = "flex";
        } else {
            document.querySelector(".error").style.display = "none";
            answerSelections.forEach(selection => {
                selection.removeEventListener("click", activeAns);
            });
            if (correctAns === userAns.innerText) {
                document.querySelector(".answer__active > .answer__text > img").src = "./assets/images/icon-correct.svg";
                document.querySelector(".answer__active").classList.add("correct");
                answerBtn.innerText = "Next Question";
            } else {
                document.querySelector(".answer__active > .answer__text > img").src = "./assets/images/icon-incorrect.svg";
                document.querySelector(".answer__active").classList.add("incorrect");
                document.querySelector(".right").src = "./assets/images/icon-correct.svg";
                answerBtn.innerText = "Next Question";
            }
        }
    }

    if (quizHeader.classList.contains("css")) {
        const correctAns = data[1]["questions"][curNum - 1]["answer"];
        const userAns = document.querySelector(".answer__active > .answer__text > span");

        if (userAns === null) {
            document.querySelector(".error").style.display = "flex";
        } else {
            document.querySelector(".error").style.display = "none";
            answerSelections.forEach(selection => {
                selection.removeEventListener("click", activeAns);
            });
            if (correctAns === userAns.innerText) {
                document.querySelector(".answer__active > .answer__text > img").src = "./assets/images/icon-correct.svg";
                document.querySelector(".answer__active").classList.add("correct");
                answerBtn.innerText = "Next Question";
            } else {
                document.querySelector(".answer__active > .answer__text > img").src = "./assets/images/icon-incorrect.svg";
                document.querySelector(".answer__active").classList.add("incorrect");
                document.querySelector(".right").src = "./assets/images/icon-correct.svg";
                answerBtn.innerText = "Next Question";
            }
        }
    }

    if (quizHeader.classList.contains("javascript")) {
        const correctAns = data[2]["questions"][curNum - 1]["answer"];
        const userAns = document.querySelector(".answer__active > .answer__text > span");

        if (userAns === null) {
            document.querySelector(".error").style.display = "flex";
        } else {
            document.querySelector(".error").style.display = "none";
            answerSelections.forEach(selection => {
                selection.removeEventListener("click", activeAns);
            });
            if (correctAns === userAns.innerText) {
                document.querySelector(".answer__active > .answer__text > img").src = "./assets/images/icon-correct.svg";
                document.querySelector(".answer__active").classList.add("correct");
                answerBtn.innerText = "Next Question";
            } else {
                document.querySelector(".answer__active > .answer__text > img").src = "./assets/images/icon-incorrect.svg";
                document.querySelector(".answer__active").classList.add("incorrect");
                document.querySelector(".right").src = "./assets/images/icon-correct.svg";
                answerBtn.innerText = "Next Question";
            }
        }
    }

    if (quizHeader.classList.contains("accessibility")) {
        const correctAns = data[3]["questions"][curNum - 1]["answer"];
        const userAns = document.querySelector(".answer__active > .answer__text > span");

        if (userAns === null) {
            document.querySelector(".error").style.display = "flex";
        } else {
            document.querySelector(".error").style.display = "none";
            answerSelections.forEach(selection => {
                selection.removeEventListener("click", activeAns);
            });
            if (correctAns === userAns.innerText) {
                document.querySelector(".answer__active > .answer__text > img").src = "./assets/images/icon-correct.svg";
                document.querySelector(".answer__active").classList.add("correct");
                answerBtn.innerText = "Next Question";
            } else {
                document.querySelector(".answer__active > .answer__text > img").src = "./assets/images/icon-incorrect.svg";
                document.querySelector(".answer__active").classList.add("incorrect");
                document.querySelector(".right").src = "./assets/images/icon-correct.svg";
                answerBtn.innerText = "Next Question";
            }
        }
    }
});

function activeAns(e) {
    document.querySelector(".answer__active").classList.remove("answer__active");

    if (e.target.parentElement.classList.contains("answer"))
        e.target.parentElement.classList.add("answer__active");
    else if (e.target.parentElement.parentElement.classList.contains("answer"))
        e.target.parentElement.parentElement.classList.add("answer__active");
    else
        e.target.classList.add("answer__active");
}

function loadQuestionPage(quiz) {
    const head = document.querySelector(".quiz-banner--header");
    head.classList.add(quiz["title"].toLowerCase());
    head.querySelector(".quiz-banner__img").src = `${quiz["icon"]}`;
    head.querySelector(".quiz-banner__text").innerText = quiz["title"];
    document.querySelector(".quiz").style.display = "block";

    curQuesNum.innerHTML = curNum;
    maxQuesNum.innerHTML = quiz["questions"].length;
    question.innerHTML = quiz["questions"][curNum - 1]["question"];

    const answers = quiz["questions"][curNum - 1]["options"];
    options.forEach((option, i) => {
        option.innerText = `${answers[i]}`;

        if (answers[i] === quiz["questions"][curNum - 1]["answer"])
            option.nextElementSibling.classList.add("right");
    })
}