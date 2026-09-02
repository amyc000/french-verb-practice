alert("APP JS LOADED");

document.addEventListener("DOMContentLoaded", function() {

    alert("DOM LOADED");

    const btn = document.getElementById("mixedMode");

    if (!btn) {
        alert("mixedMode button NOT FOUND");
        return;
    }

    alert("mixedMode button FOUND");

    btn.addEventListener("click", function() {
        alert("BUTTON CLICKED");
    });

});
