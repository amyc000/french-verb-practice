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
verb:"travailler",
type:"regular",
forms:{je:"travaille",tu:"travailles",il:"travaille",elle:"travaille",on:"travaille",nous:"travaillons",vous:"travaillez",ils:"travaillent",elles:"travaillent"}
},
{
verb:"jouer",
type:"regular",
forms:{je:"joue",tu:"joues",il:"joue",elle:"joue",on:"joue",nous:"jouons",vous:"jouez",ils:"jouent",elles:"jouent"}
},
{
verb:"penser",
type:"regular",
forms:{je:"pense",tu:"penses",il:"pense",elle:"pense",on:"pense",nous:"pensons",vous:"pensez",ils:"pensent",elles:"pensent"}
},
{
verb:"arriver",
type:"regular",
forms:{je:"arrive",tu:"arrives",il:"arrive",elle:"arrive",on:"arrive",nous:"arrivons",vous:"arrivez",ils:"arrivent",elles:"arrivent"}
},
{
verb:"porter",
type:"regular",
forms:{je:"porte",tu:"portes",il:"porte",elle:"porte",on:"porte",nous:"portons",vous:"portez",ils:"portent",elles:"portent"}
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
},
{
verb:"aller",
type:"irregular",
forms:{je:"vais",tu:"vas",il:"va",elle:"va",on:"va",nous:"allons",vous:"allez",ils:"vont",elles:"vont"}
},
{
verb:"faire",
type:"irregular",
forms:{je:"fais",tu:"fais",il:"fait",elle:"fait",on:"fait",nous:"faisons",vous:"faites",ils:"font",elles:"font"}
},
{
verb:"venir",
type:"irregular",
forms:{je:"viens",tu:"viens",il:"vient",elle:"vient",on:"vient",nous:"venons",vous:"venez",ils:"viennent",elles:"viennent"}
},
{
verb:"prendre",
type:"irregular",
forms:{je:"prends",tu:"prends",il:"prend",elle:"prend",on:"prend",nous:"prenons",vous:"prenez",ils:"prennent",elles:"prennent"}
},
{
verb:"dire",
type:"irregular",
forms:{je:"dis",tu:"dis",il:"dit",elle:"dit",on:"dit",nous:"disons",vous:"dites",ils:"disent",elles:"disent"}
},
{
verb:"voir",
type:"irregular",
forms:{je:"vois",tu:"vois",il:"voit",elle:"voit",on:"voit",nous:"voyons",vous:"voyez",ils:"voient",elles:"voient"}
},
{
verb:"pouvoir",
type:"irregular",
forms:{je:"peux",tu:"peux",il:"peut",elle:"peut",on:"peut",nous:"pouvons",vous:"pouvez",ils:"peuvent",elles:"peuvent"}
},
{
verb:"vouloir",
type:"irregular",
forms:{je:"veux",tu:"veux",il:"veut",elle:"veut",on:"veut",nous:"voulons",vous:"voulez",ils:"veulent",elles:"veulent"}
},
{
verb:"devoir",
type:"irregular",
forms:{je:"dois",tu:"dois",il:"doit",elle:"doit",on:"doit",nous:"devons",vous:"devez",ils:"doivent",elles:"doivent"}
},
{
verb:"savoir",
type:"irregular",
forms:{je:"sais",tu:"sais",il:"sait",elle:"sait",on:"sait",nous:"savons",vous:"savez",ils:"savent",elles:"savent"}
},
{
verb:"mettre",
type:"irregular",
forms:{je:"mets",tu:"mets",il:"met",elle:"met",on:"met",nous:"mettons",vous:"mettez",ils:"mettent",elles:"mettent"}
},
{
verb:"passer",
type:"regular",
forms:{je:"passe",tu:"passes",il:"passe",elle:"passe",on:"passe",nous:"passons",vous:"passez",ils:"passent",elles:"passent"}
},
{
verb:"laisser",
type:"regular",
forms:{je:"laisse",tu:"laisses",il:"laisse",elle:"laisse",on:"laisse",nous:"laissons",vous:"laissez",ils:"laissent",elles:"laissent"}
},
{
verb:"croire",
type:"irregular",
forms:{je:"crois",tu:"crois",il:"croit",elle:"croit",on:"croit",nous:"croyons",vous:"croyez",ils:"croient",elles:"croient"}
},
{
verb:"trouver",
type:"regular",
forms:{je:"trouve",tu:"trouves",il:"trouve",elle:"trouve",on:"trouve",nous:"trouvons",vous:"trouvez",ils:"trouvent",elles:"trouvent"}
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
return arr[Math.floor(Math.random() * arr.length)];
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
currentVerb.forms[currentSubject].toLowerCase();

const fullAnswer =
(currentSubject + " " + shortAnswer)
.toLowerCase();

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
currentSubject +
" " +
currentVerb.forms[currentSubject];

}

function markHard() {

const id =
currentVerb.verb +
"|" +
currentSubject;

if (!progress.hardCards.includes(id)) {

progress.hardCards.push(id);

saveProgress();

updateStats();

alert("Carte ajoutée aux verbes difficiles.");
}

}

function markKnown() {

const id =
currentVerb.verb +
"|" +
currentSubject;

if (!progress.knownCards.includes(id)) {

progress.knownCards.push(id);

saveProgress();

alert("Carte marquée comme connue.");
}

}

function showWhy() {

let text =
"<h3>Explanation</h3>";

text +=
"<p><strong>Verb:</strong> " +
currentVerb.verb +
"</p>";

text +=
"<p><strong>Subject:</strong> " +
currentSubject +
"</p>";

text +=
"<p><strong>Correct form:</strong> " +
currentVerb.forms[currentSubject] +
"</p>";

if (currentVerb.type === "regular") {

text +=
"<p>This follows a regular conjugation pattern.</p>";

} else {

text +=
"<p>This is an irregular form that must be memorized.</p>";

}

document.getElementById("explanation").innerHTML =
text;

}

document.addEventListener(
"DOMContentLoaded",
function() {

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

document
.getElementById("whyBtn")
.addEventListener("click", showWhy);

document
.getElementById("hardBtn")
.addEventListener("click", markHard);

document
.getElementById("knowBtn")
.addEventListener("click", markKnown);

document
.getElementById("answer")
.addEventListener("keydown", function(e) {

if (e.key === "Enter") {
checkAnswer();
}

});

}
);
``
