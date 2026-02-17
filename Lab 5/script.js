document.addEventListener("DOMContentLoaded", function () {
    main();
});

function getfocus(e) {
    e.target.style.background = "#fffae0";
}
function lostfocus(e) {
    e.target.style.background = "white";
}

function focusHandler() {
    const inputs = document.querySelectorAll("input[type='text'], input[type='email'], input[type='password']");
    inputs.forEach(input => {
        input.addEventListener("focus", getfocus);
        input.addEventListener("blur", lostfocus);
    });
}

function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const field = input.closest(".form-group") || input.parentElement;
    const errorSpan = field.querySelector(".error-msg");

    if (errorSpan) {
        errorSpan.textContent = message; 
        errorSpan.style.display = "block"; 
    }
    input.classList.add("error-border"); 
}

function clearError(inputId) {
    const input = document.getElementById(inputId);
    const field = input.closest(".form-group") || input.parentElement;
    const errorSpan = field.querySelector(".error-msg");

    if (errorSpan) {
        errorSpan.textContent = ""; 
        errorSpan.style.display = "none"; 
    }
    input.classList.remove("error-border");
}

function validateForm() {
    let isValid = true;

    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const terms = document.getElementById("terms");

    clearError("username");
    clearError("email");
    clearError("password");
    clearError("terms");

    if (username.value.trim() === "") {
        showError("username", "Username is required.");
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
        showError("email", "Please enter a valid email address.");
        isValid = false;
    }

    if (password.value.trim().length < 8) {
        showError("password", "Password must be at least 8 characters.");
        isValid = false;
    }

    if (!terms.checked) {
        showError("terms", "You must agree to the terms.");
        isValid = false;
    }

    return isValid;
}

function focusHandler() {
    const inputs = document.querySelectorAll("input[type='text'], input[type='email'], input[type='password']");
    inputs.forEach(input => {
        input.addEventListener("focus", (e) => e.target.style.background = "#fffae0");
        input.addEventListener("blur", (e) => e.target.style.background = "white");
    });
}

function setupGallery() {

    const thumbs = document.querySelectorAll(".thumb");
    const caption = document.getElementById("image-caption");

    thumbs.forEach(thumb => {
        
        const selectTile = () => {
            thumbs.forEach(t => t.classList.remove("expanded"));

            thumb.classList.add("expanded");

            const cityName = thumb.getAttribute("data-city");
            caption.textContent = `You selected: ${cityName}`;
        };

        thumb.addEventListener("click", function() {
            selectTile();
        });

        thumb.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                selectTile();
            }
        });
    });
}

function main() {
    focusHandler();
    setupGallery(); 

    const form = document.getElementById("signup-form");
    form.addEventListener("submit", function (event) {
        event.preventDefault(); 
        if (validateForm()) {
            alert("Form submitted successfully!");
        }
    });
}