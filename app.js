const verbs = [
  {
    verb: "parler",
    type: "regular",
    forms: {
      je: "parle",
      tu: "parles",
      il: "parle",
      elle: "parle",
      on: "parle",
      nous: "parlons",
      vous: "parlez",
      ils: "parlent",
      elles: "parlent"
    }
  },
  {
    verb: "aimer",
    type: "regular",
    forms: {
      je: "aime",
      tu: "aimes",
      il: "aime",
      elle: "aime",
      on: "aime",
      nous: "aimons",
      vous: "aimez",
      ils: "aiment",
      elles: "aiment"
    }
  },
  {
    verb: "donner",
    type: "regular",
    forms: {
      je: "donne",
      tu: "donnes",
      il: "donne",
      elle: "donne",
      on: "donne",
      nous: "donnons",
      vous: "donnez",
      ils: "donnent",
      elles: "donnent"
    }
  },
  {
    verb: "être",
    type: "irregular",
    forms: {
      je: "suis",
      tu: "es",
      il: "est",
      elle: "est",
      on: "est",
      nous: "sommes",
      vous: "êtes",
      ils: "sont",
      elles: "sont"
    }
  },
  {
    verb: "avoir",
    type: "irregular",
    forms: {
      je: "ai",
      tu: "as",
      il: "a",
      elle: "a",
      on: "a",
      nous: "avons",
      vous: "avez",
      ils: "ont",
      elles: "ont"
    }
  },
  {
    verb: "aller",
    type: "irregular",
    forms: {
      je: "vais",
      tu: "vas",
      il: "va",
      elle: "va",
      on: "va",
      nous: "allons",
      vous: "allez",
      ils: "vont",
      elles: "vont"
    }
  },
  {
    verb: "faire",
    type: "irregular",
    forms: {
      je: "fais",
      tu: "fais",
      il: "fait",
      elle: "fait",
      on: "fait",
      nous: "faisons",
      vous: "faites",
      ils: "font",
      elles: "font"
    }
  },
  {
    verb: "venir",
    type: "irregular",
    forms: {
      je: "viens",
      tu: "viens",
      il: "vient",
      elle: "vient",
      on: "vient",
      nous: "venons",
      vous: "venez",
      ils: "viennent",
      elles: "viennent"
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

let progress = JSON.parse(
  localStorage.getItem("frenchVerbProgress")
) || {
  cardsStudied: 0,
  hardCards: []
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

  document.getElementById("hardCount").textContent =
    progress.hardCards.length;
}

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
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

  document.getElementById("explanation").style.display =
    "none";
}

function startPractice() {

  document
    .getElementById("homeScreen")
    .classList.add("
                
