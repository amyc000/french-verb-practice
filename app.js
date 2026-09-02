const verbs = [
  {
    verb: "parler",
    type: "regular",
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
    type: "regular",
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
    type: "irregular",
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

  document.getElementById("cardsStudied").textContent =
    progress.cardsStudied;
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateCard() {

  currentVerb = randomItem(verbs);
  currentSubject = randomItem(pronouns);

  document.getElementById("verb").textContent =
    currentVerb.verb;

  document.getElementById("subject").textContent =
    currentSubject
