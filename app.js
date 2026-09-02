function startPractice() {

    document
        .getElementById("homeScreen")
        .classList.add("hidden");

    document
        .getElementById("practiceScreen")
        .classList.remove("hidden");

    document.getElementById("verb").textContent =
        "parler";

    document.getElementById("subject").textContent =
        "nous";
}

document
    .getElementById("mixedMode")
    .addEventListener("click", startPractice);

console.log("app loaded");
