const verbs = ["parler", "aimer", "donner", "travailler"];
const pronouns = ["je", "tu", "il", "nous", "vous", "ils"];

function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function startPractice() {

    document
        .getElementById("homeScreen")
        .classList.add("hidden");

    document
        .getElementById("practiceScreen")
        .classList.remove("hidden");

    document.getElementById("verb").textContent =
        randomItem(verbs);

    document.getElementById("subject").textContent =
        randomItem(pronouns);
}

document.addEventListener("DOMContentLoaded", function() {

    document
        .getElementById("mixedMode")
        .addEventListener("click", startPractice);

});
