const verbs = [
{
verb:"parler",
type:"regular",
forms:{je:"parle",tu:"parles",il:"parle",elle:"parle",on:"parle",nous:"parlons",vous:"parlez",ils:"parlent",elles:"parlent"}
},
{
verb:"aimer",
type:"regular",
forms:{je:"aime",tu:"aimes",il:"aime",elle:"aime",on:"aime",nous:"aimons",vous:"aimez",ils:"aiment",elles:"aiment"}
},
{
verb:"donner",
type:"regular",
forms:{je:"donne",tu:"donnes",il:"donne",elle:"donne",on:"donne",nous:"donnons",vous:"donnez",ils:"donnent",elles:"donnent"}
},
{
verb:"aller",
type:"irregular",
forms:{je:"vais",tu:"vas",il:"va",elle:"va",on:"va",nous:"allons",vous:"allez",ils:"vont",elles:"vont"}
},
{
verb:"être",
type:"irregular",
forms:{je:"suis",tu:"es",il:"est",elle:"est",on:"est",nous:"sommes",vous:"êtes",ils:"sont",elles:"sont"}
},
{
verb:"avoir",
type:"irregular",
forms:{je:"ai",tu:"as",il:"a",elle:"a",on:"a",nous:"avons",vous:"avez",ils:"ont",elles:"ont"}
}
];

const pronouns = [
"je",
"tu",
"il",
"elle",
"on",
"nous",
"vous",
"ils",
"elles"
];

let currentVerb;
let currentSubject;
let reviewMode = "mixed";

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

if (!progress.knownCards) {
progress.knownCards = [];
}

function saveProgress() {

localStorage.setItem(
"frenchVerbProgress",
JSON.stringify(progress)
);

}

function updateStats() {

document.getElementById("cardsStudied").textContent =
progress.cardsStudied;

document.getElementById("hardCount").textContent =
progress.hardCards.length;

document.getElementById("knownCount").textContent =
progress.knownCards.length;

}

function randomItem(arr) {

return arr[
Math.floor(Math.random() * arr.length)
];

}

function getDisplayForm() {

const answer =
currentVerb.forms[currentSubject];

const firstLetter =
answer.charAt(0).toLowerCase();

const vowels =
"aeiouhàâéèêëîïôöùûü";

if (
currentSubject === "je" &&
vowels.includes(firstLetter)
) {

return "j'" + answer;

}

return currentSubject + " " + answer;

}

function nextCard() {

let candidateCards = [];

verbs.forEach(function (verb) {

pronouns.forEach(function (subject) {

const cardId =
verb.verb + "|" + subject;

if (reviewMode === "difficult") {

if (
progress.hardCards.includes(cardId)
) {

candidateCards.push({
verb: verb,
subject: subject
});

}

}
else {

let weight = 5;

if (
progress.hardCards.includes(cardId)
) {
weight = 15;
}

if (
progress.knownCards.includes(cardId)
) {
weight = 1;
}

for (
let i = 0;
i < weight;
i++
) {

candidateCards.push({
verb: verb,
subject: subject
});

}

}

});

});

if (candidateCards.length === 0) {

document.getElementById("feedback").innerHTML =
"😅 Aucune carte difficile pour le moment.";

return;

}

const selected =
randomItem(candidateCards);

currentVerb =
selected.verb;

currentSubject =
selected.subject;

document.getElementById("verb").textContent =
currentVerb.verb;

document.getElementById("subject").textContent =
currentSubject;

document.getElementById("answer").value = "";

document.getElementById("feedback").innerHTML = "";

document.getElementById("correctAnswer").innerHTML = "";

}

function startPractice() {

reviewMode = "mixed";

document
.getElementById("homeScreen")
.classList.add("hidden");

document
.getElementById("practiceScreen")
.classList.remove("hidden");

nextCard();

}

function startDifficultReview() {

reviewMode = "difficult";

document
.getElementById("homeScreen")
.classList.add("hidden");

document
.getElementById("practiceScreen")
.classList.remove("hidden");

nextCard();

}

function checkAnswer() {

let userAnswer =
document.getElementById("answer")
.value
.trim()
.toLowerCase();

const shortAnswer =
currentVerb.forms[currentSubject]
.toLowerCase();

let fullAnswer;

const firstLetter =
currentVerb.forms[currentSubject]
.charAt(0)
.toLowerCase();

const vowels =
"aeiouhàâéèêëîïôöùûü";

if (
currentSubject === "je" &&
vowels.includes(firstLetter)
) {

fullAnswer =
(
"j'" +
currentVerb.forms[currentSubject]
).toLowerCase();

}
else {

fullAnswer =
(
currentSubject +
" " +
currentVerb.forms[currentSubject]
).toLowerCase();

}

if (
userAnswer === shortAnswer ||
userAnswer === fullAnswer
) {

document.getElementById("feedback").innerHTML =
"✅ Correct !";

progress.cardsStudied++;

saveProgress();

updateStats();

}
else {

document.getElementById("feedback").innerHTML =
"❌ Pas tout à fait...";

}

document.getElementById("correctAnswer").innerHTML =
"<strong>Correct form:</strong><br>" +
getDisplayForm();

}

function markHard() {

const id =
currentVerb.verb +
"|" +
currentSubject;

if (
!progress.hardCards.includes(id)
) {

progress.hardCards.push(id);

saveProgress();

updateStats();

}

document.getElementById("feedback").innerHTML =
"✅ Carte ajoutée aux verbes difficiles.";

setTimeout(function () {

nextCard();

}, 1000);

}

function markKnown() {

const id =
currentVerb.verb +
"|" +
currentSubject;

if (
!progress.knownCards.includes(id)
) {

progress.knownCards.push(id);

saveProgress();

updateStats();

}

document.getElementById("feedback").innerHTML =
"✅ Carte marquée comme facile.";

setTimeout(function () {

nextCard();

}, 1000);

}

document.addEventListener(
"DOMContentLoaded",
function() {

updateStats();

document
.getElementById("mixedMode")
.addEventListener(
"click",
startPractice
);

  document
.getElementById("difficultMode")
.addEventListener(
"click",
startDifficultReview
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
.getElementById("hardBtn")
.addEventListener(
"click",
markHard
);

document
.getElementById("knowBtn")
.addEventListener(
"click",
markKnown
);

document
.getElementById("answer")
.addEventListener(
"keydown",
function(e) {

if (e.key === "Enter") {

checkAnswer();

}

}
);

}
);
