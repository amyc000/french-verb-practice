const cards = [
    {
        verb: "parler",
        type: "regular",
        subject: "je",
        answer: "parle"
    },
    {
        verb: "parler",
        type: "regular",
        subject: "nous",
        answer: "parlons"
    },
    {
        verb: "aimer",
        type: "regular",
        subject: "vous",
        answer: "aimez"
    },
    {
        verb: "donner",
        type: "regular",
        subject: "elles",
        answer: "donnent"
    },
    {
        verb: "aller",
        type: "irregular",
        subject: "ils",
        answer: "vont"
    },
    {
        verb: "aller",
        type: "irregular",
        subject: "nous",
        answer: "allons"
    },
    {
        verb: "être",
        type: "irregular",
        subject: "vous",
        answer: "êtes"
    },
    {
        verb: "avoir",
        type: "irregular",
        subject: "elles",
        answer: "ont"
    }
];

let currentCard;

let progress =
    JSON.parse(
        localStorage.getItem("frenchVerbProgress")
    ) || {};

if (!progress.cardsStudied) {
    progress.cardsStudied = 0;
}

if (!progress.hardCards) {
    progress.hardCards = [];
}

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

    document.getElementById("hardCount")
        .textContent =
        progress.hardCards.length;
}

function randomItem(arr) {

    return arr[
        Math.floor(
            Math.random() * arr.length
        )
    ];
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

    document.getElementById("explanation").innerHTML = "";
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

function showWhy() {

    let explanation = "";

    explanation +=
        "<h3>Explanation</h3>";

    explanation +=
        "<p><strong>Verb:</strong> " +
        currentCard.verb +
        "</p>";

    explanation +=
        "<p><strong>Subject:</strong> " +
        currentCard.subject +
        "</p>";

    explanation +=
        "<p><strong>Correct form:</strong> " +
        currentCard.answer +
        "</p>";

    if (currentCard.type === "regular") {

        explanation +=
            "<p>This follows a regular conjugation pattern.</p>";

    } else {

        explanation +=
            "<p>This is an irregular form that must be memorized.</p>";
    }

    document.getElementById("explanation")
        .innerHTML = explanation;
}

function markHard() {

    const cardId =
        currentCard.verb +
        "|" +
        currentCard.subject;

    if (
        !progress.hardCards.includes(cardId)
    ) {

        progress.hardCards.push(cardId);

        saveProgress();

        updateStats();

        alert(
            "Carte ajoutée aux verbes difficiles."
        );
    }
}

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateStats();

        document
            .getElementById("mixedMode")
            .addEventListener(
                "click",
                startPractice
            );

        document
            .getElementById("nextBtn")
            .addEventListener(
                "click",
                nextCard
            );

        document
            .getElementById("checkBtn")
            .addEventListener(
                "click",
                checkAnswer
            );

        document
            .getElementById("whyBtn")
            .addEventListener(
                "click",
                showWhy
            );

        document
            .getElementById("hardBtn")
            .addEventListener(
                "click",
                markHard
            );

        document
            .getElementById("answer")
            .addEventListener(
                "keydown",
                function (e) {

                    if (e.key === "Enter") {

                        checkAnswer();
                    }

                }
            );

    }
);
