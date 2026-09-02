const verbs = [
{
verb:"parler",
type:"regular",
forms:{
je:"parle",
tu:"parles",
il:"parle",
elle:"parle",
on:"parle",
nous:"parlons",
vous:"parlez",
ils:"parlent",
elles:"parlent"
}
},
{
verb:"aimer",
type:"regular",
forms:{
je:"aime",
tu:"aimes",
il:"aime",
elle:"aime",
on:"aime",
nous:"aimons",
vous:"aimez",
ils:"aiment",
elles:"aiment"
}
},
{
verb:"donner",
type:"regular",
forms:{
je:"donne",
tu:"donnes",
il:"donne",
elle:"donne",
on:"donne",
nous:"donnons",
vous:"donnez",
ils:"donnent",
elles:"donnent"
}
},
{
verb:"aller",
type:"irregular",
forms:{
je:"vais",
tu:"vas",
il:"va",
elle:"va",
on:"va",
nous:"allons",
vous:"allez",
ils:"vont",
elles:"vont"
}
},
{
verb:"être",
type:"irregular",
forms:{
je:"suis",
tu:"es",
il:"est",
elle:"est",
on:"est",
nous:"sommes",
vous:"êtes",
ils:"sont",
elles:"sont"
}
},
{
verb:"avoir",
type:"irregular",
forms:{
je:"ai",
tu:"as",
il:"a",
elle:"a",
on:"a",
nous:"avons",
vous:"avez",
ils:"ont",
elles:"ont"
}
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

currentVerb = randomItem(verbs);
currentSubject = randomItem(pronouns);

document.getElementById("verb").textContent =
currentVerb.verb;

document.getElementById("subject").textContent =
currentSubject;

document.getElementById("answer").value = "";

document.getElementById("feedback").innerHTML = "";

document.getElementById("correctAnswer").innerHTML = "";

document.getElementById("explanation").innerHTML = "";

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

} else {

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

} else {

document.getElementById("feedback").innerHTML =
"❌ Pas tout à fait...";

}

document.getElementById("correctAnswer").innerHTML =
"<strong>Correct form:</strong><br>" +
getDisplayForm();

}

function showWhy() {

let explanation = "";

explanation +=
"<h3>Explanation</h3>";

explanation +=
"<p><strong>Verb:</strong> " +
currentVerb.verb +
"</p>";

explanation +=
"<p><strong>Subject:</strong> " +
currentSubject +
"</p>";

explanation +=
"<p><strong>Correct form:</strong> " +
getDisplayForm() +
"</p>";

if (currentVerb.type === "regular") {

explanation +=
"<p>This follows a regular conjugation pattern.</p>";

} else {

explanation +=
"<p>This is an irregular form that must be memorized.</p>";

}

document.getElementById("explanation").innerHTML =
explanation;

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

}

document.getElementById("feedback").innerHTML =
"✅ Forme marquée comme maîtrisée.";

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
