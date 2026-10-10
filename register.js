// Select the registration form and message
const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");

// Set the latest allowed date of birth
document.getElementById("dob").max =
    new Date().toISOString().split("T")[0];

// Check the form when it is submitted
registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const dob = new Date(document.getElementById("dob").value);
    const password = document.getElementById("password").value;
    const confirmPassword =
        document.getElementById("confirmPassword").value;

    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();

    const birthdayNotReached =
        today.getMonth() < dob.getMonth() ||
        (today.getMonth() === dob.getMonth() &&
            today.getDate() < dob.getDate());

    if (birthdayNotReached) {
        age--;
    }

    if (dob > today || age < 18) {
        showMessage("Registration is currently available for adults aged 18 or older.");
        return;
    }

    if (password !== confirmPassword) {
        showMessage("Passwords do not match. Please try again.");
        return;
    }

    showMessage(
        "Form validated successfully! Account creation will be available after backend integration."
    );
});

// Display a message to the user
function showMessage(message) {
    registerMessage.textContent = message;
    registerMessage.style.display = "block";
}