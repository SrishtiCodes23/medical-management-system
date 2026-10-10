// Select the login form and message area
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

// Handle login form submission
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    if (!email || !password || !role) {
        showMessage("Please fill in all the required fields.");
        return;
    }

    showMessage(
        "Login page is working! Actual account verification will be added when we connect Java and MySQL."
    );
});

// Display a message
function showMessage(message) {
    loginMessage.textContent = message;
    loginMessage.style.display = "block";
}