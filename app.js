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

document.addEventListener("DOMContentLoaded", function () {

    document
        .getElementById("mixedMode")
        .addEventListener("click", startPractice);

});
