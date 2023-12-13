const selections = document.querySelectorAll(".quiz-banner--select");
const question = document.querySelector(".question__current");
const answerSelections = document.querySelectorAll(".answer")
const curQuesNum = document.querySelector(".current");
const maxQuesNum = document.querySelector(".end");
const options = document.querySelectorAll(".answer__text");
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
    selection.addEventListener("click", e => {
        document.querySelector(".answer__active").classList.remove("answer__active");

        if (e.target.parentElement.classList.contains("answer"))
            e.target.parentElement.classList.add("answer__active");
        else
            e.target.classList.add("answer__active");
    })
})

function loadQuestionPage(quiz) {
    const head = document.querySelector(".quiz-banner--header");
    head.classList.add(quiz["title"].toLowerCase());
    head.querySelector(".quiz-banner__img").src = `${quiz["icon"]}`;
    head.querySelector(".quiz-banner__text").innerHTML = quiz["title"];
    document.querySelector(".quiz").style.display = "block";

    curQuesNum.innerHTML = curNum;
    maxQuesNum.innerHTML = quiz["questions"].length;
    question.innerHTML = quiz["questions"][curNum - 1]["question"];

    const answers = quiz["questions"][curNum - 1]["options"];
    options.forEach((option, i) => {
        option.innerHTML = `${answers[i].replaceAll("<", "&lt;").replace(">", "&gt;")}`;
    })
}