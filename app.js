const cards = [
    {
        verb: "parler",
        subject: "nous",
        answer: "parlons"
    },
    {
        verb: "aimer",
        subject: "vous",
        answer: "aimez"
    },
    {
        verb: "donner",
        subject: "je",
        answer: "donne"
    },
    {
        verb: "aller",
        subject: "ils",
        answer: "vont"
    }
];

let currentCard;

let progress =
    JSON.parse(
        localStorage.getItem("frenchVerbProgress")
    ) || {
        cardsStudied: 0
    };

function saveProgress() {

    localStorage.setItem(
        "frenchVerbProgress",
        JSON.stringify(progress)
    );
}

function updateStats() {

    document.getElementById("cardsStudied")
        .textContent =
        progress.cardsStudied;
}

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

    nextCard();
}

function nextCard() {

    currentCard = randomItem(cards);

    document.getElementById("verb").textContent =
        currentCard.verb;

    document.getElementById("subject").textContent =
        currentCard.subject;

    document.getElementById("answer").value = "";

    document.getElementById("feedback").innerHTML = "";

    document.getElementById("correctAnswer").innerHTML = "";
}

function checkAnswer() {

    let userAnswer =
        document.getElementById("answer")
        .value
        .trim()
        .toLowerCase();

    const shortAnswer =
        currentCard.answer.toLowerCase();

    const fullAnswer =
        (
            currentCard.subject +
            " " +
            currentCard.answer
        ).toLowerCase();

    if (
        userAnswer === shortAnswer ||
        userAnswer === fullAnswer
    ) {

        document.getElementById("feedback").innerHTML =
            "✅ Correct !";

        progress.cardsStudied++;

        saveProgress();

        updateStats();

    } else {

        document.getElementById("feedback").innerHTML =
            "❌ Pas tout à fait...";
    }

    document.getElementById("correctAnswer").innerHTML =
        "<strong>Correct form:</strong><br>" +
        currentCard.subject +
        " " +
        currentCard.answer;
}

document.addEventListener("DOMContentLoaded", function () {

    updateStats();

    document
        .getElementById("mixedMode")
        .addEventListener("click", startPractice);

    document
        .getElementById("nextBtn")
        .addEventListener("click", nextCard);

    document
        .getElementById("checkBtn")
        .addEventListener("click", checkAnswer);

});
