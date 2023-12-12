const selections = document.querySelectorAll(".quiz-banner--select");

let data;
fetch("./data.json").then(response => {
    return response.json();
}).then(object => {
    data = object["quizzes"];
    selections.forEach((selection, i) => {
        selection.querySelector(".quiz-banner__img").src = `${data[i]["icon"]}`;
        selection.querySelector(".quiz-banner__text").innerHTML = `${data[i]["title"]}`;
        selection.classList.add(`${data[i]["title"].toLowerCase()}`);
    });
});