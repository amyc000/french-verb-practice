const verbs = [
  {
    verb: "parler",
    forms: {
      je: "parle",
      tu: "parles",
      il: "parle",
      nous: "parlons",
      vous: "parlez",
      ils: "parlent"
    }
  },
  {
    verb: "aimer",
    forms: {
      je: "aime",
      tu: "aimes",
      il: "aime",
      nous: "aimons",
      vous: "aimez",
      ils: "aiment"
    }
  },
  {
    verb: "aller",
    forms: {
      je: "vais",
      tu: "vas",
      il: "va",
      nous: "allons",
      vous: "allez",
      ils: "vont"
    }
  }
];

const pronouns = [
  "je",
  "tu",
  "il",
  "nous",
  "vous",
  "ils"
];

let currentVerb;
let currentSubject;

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateCard() {

  currentVerb = randomItem(verbs);
  currentSubject = randomItem(pronouns);

  document.getElementById("verb").textContent =
    currentVerb.verb;

  document.getElementById("subject").textContent =
    currentSubject;

  document.getElementById("answer").value = "";

  document.getElementById("feedback").innerHTML = "";
  document.getElementById("correctAnswer").innerHTML = "";
}

function startPractice() {

  document
    .getElementById("homeScreen")
    .classList.add("hidden");

  document
    .getElementById("practiceScreen")
    .classList.remove("hidden");

  generateCard();
}

function normalize(text) {

  let result =
    text.trim().toLowerCase();

  for (const pronoun of pronouns) {

    if (result.startsWith(pronoun + " ")) {

      result =
        result.substring(pronoun.length + 1);

      break;
    }
  }

  return result;
}

function checkAnswer() {

  const userAnswer =
    normalize(
      document.getElementById("answer").value
    );

  const correct =
    currentVerb.forms[currentSubject];

  if (userAnswer === correct) {

    document.getElementById("feedback").innerHTML =
      "✅ Correct !";

  } else {

    document.getElementById("feedback").innerHTML =
      "❌ Pas tout à fait...";
  }

  document.getElementById("correctAnswer").innerHTML =
    "<strong>Correct form:</strong><br>" +
    currentSubject +
    " " +
    correct;
}

document.addEventListener("DOMContentLoaded", function() {

  document
    .getElementById("mixedMode")
    .addEventListener("click", startPractice);

  document
    .getElementById("checkBtn")
    .addEventListener("click", checkAnswer);

  document
    .getElementById("nextBtn")
    .addEventListener("click", generateCard);

});
