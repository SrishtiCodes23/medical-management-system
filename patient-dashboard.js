// Get dashboard elements
const patientName = document.getElementById("patientName");
const welcomeName = document.getElementById("welcomeName");
const upcomingCount = document.getElementById("upcomingCount");
const recordsCount = document.getElementById("recordsCount");
const pendingCount = document.getElementById("pendingCount");
const appointmentTable = document.getElementById("appointmentTable");
const logoutBtn = document.getElementById("logoutBtn");

// Sample information for frontend testing
const appointments = [];
const medicalRecords = [];

// Display the patient's name
const savedName = sessionStorage.getItem("patientName");

if (savedName) {
    patientName.textContent = savedName;
    welcomeName.textContent = savedName.split(" ")[0];
}

// Update dashboard summary cards
function updateSummary() {
    upcomingCount.textContent = appointments.filter(
        appointment => appointment.status !== "Cancelled"
    ).length;

    recordsCount.textContent = medicalRecords.length;

    pendingCount.textContent = appointments.filter(
        appointment => appointment.status === "Pending"
    ).length;
}

// Display appointments
function displayAppointments() {
    appointmentTable.replaceChildren();

    if (appointments.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 5;
        cell.className = "empty-message";
        cell.textContent =
            "No appointments to display yet. Book an appointment to get started.";

        row.appendChild(cell);
        appointmentTable.appendChild(row);
        return;
    }

    appointments.forEach(function (appointment) {
        const row = document.createElement("tr");

        [
            appointment.doctor,
            appointment.specialization,
            appointment.date,
            appointment.time,
            appointment.status
        ].forEach(function (value) {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        appointmentTable.appendChild(row);
    });
}

// Log out of the frontend demonstration
logoutBtn.addEventListener("click", function () {
    sessionStorage.removeItem("patientName");
    window.location.href = "login.html";
});

// Load the dashboard
updateSummary();
displayAppointments();