const appointmentForm = document.getElementById("appointmentForm");

const specializationInput = document.getElementById("doctorSpecialization");
const doctorInput = document.getElementById("doctorName");
const dateInput = document.getElementById("appointmentDate");

const appointmentsTable = document.getElementById("appointmentsTable");
const emptyMessage = document.getElementById("emptyMessage");
const formMessage = document.getElementById("formMessage");

const appointments = [];

const doctors = [
    {
        name: "Dr. Aditi Sharma",
        specialization: "General Physician"
    },
    {
        name: "Dr. Rahul Verma",
        specialization: "Cardiologist"
    },
    {
        name: "Dr. Priya Mehta",
        specialization: "Dermatologist"
    },
    {
        name: "Dr. Arjun Kapoor",
        specialization: "Neurologist"
    },
    {
        name: "Dr. Neha Singh",
        specialization: "Pediatrician"
    },
    {
        name: "Dr. Rohan Gupta",
        specialization: "Orthopedic"
    },
    {
        name: "Dr. Ananya Roy",
        specialization: "Gynecologist"
    },
    {
        name: "Dr. Sneha Das",
        specialization: "Dentist"
    },
    {
        name: "Dr. Kabir Malhotra",
        specialization: "Ophthalmologist"
    },
    {
        name: "Dr. Meera Joshi",
        specialization: "Psychiatrist"
    }
];

// Set the earliest selectable date to today.
const today = new Date();
const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
].join("-");

dateInput.min = localToday;

// Load a patient's name if it exists in this browser session.
const savedPatientName = sessionStorage.getItem("patientName");

if (savedPatientName) {
    document.getElementById("patientName").value = savedPatientName;
}

// Show doctors belonging to the selected specialization.
function updateDoctorList() {
    const selectedSpecialization = specializationInput.value;

    doctorInput.replaceChildren();

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select a doctor";

    doctorInput.appendChild(defaultOption);

    const matchingDoctors = doctors.filter(function (doctor) {
        return doctor.specialization === selectedSpecialization;
    });

    matchingDoctors.forEach(function (doctor) {
        const option = document.createElement("option");

        option.value = doctor.name;
        option.textContent = doctor.name;

        doctorInput.appendChild(option);
    });

    doctorInput.disabled = matchingDoctors.length === 0;

    if (matchingDoctors.length === 0 && selectedSpecialization) {
        defaultOption.textContent = "No doctors listed for this specialization";
    }
}

specializationInput.addEventListener("change", updateDoctorList);

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = "form-message " + type;
}

function displayAppointments() {
    appointmentsTable.replaceChildren();

    emptyMessage.style.display = appointments.length === 0 ? "block" : "none";

    appointments.forEach(function (appointment) {
        const row = document.createElement("tr");

        const values = [
            appointment.doctor,
            appointment.date,
            appointment.time,
            appointment.reason,
            appointment.status
        ];

        values.forEach(function (value, index) {
            const cell = document.createElement("td");

            if (index === 4) {
                const badge = document.createElement("span");

                badge.className = "status";
                badge.textContent = value;

                cell.appendChild(badge);
            } else {
                cell.textContent = value;
            }

            row.appendChild(cell);
        });

        appointmentsTable.appendChild(row);
    });
}

appointmentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const patientName = document.getElementById("patientName").value.trim();
    const patientEmail = document.getElementById("patientEmail").value.trim();
    const doctor = doctorInput.value;
    const specialization = specializationInput.value;
    const date = dateInput.value;
    const time = document.getElementById("appointmentTime").value;
    const reason = document.getElementById("appointmentReason").value.trim();

    if (!patientName || !patientEmail || !doctor || !specialization ||
        !date || !time || !reason) {
        showFormMessage("Please complete all the required fields.", "error-message");
        return;
    }

    if (date < localToday) {
        showFormMessage("Please select today or a future date.", "error-message");
        return;
    }

    const appointment = {
        patientName: patientName,
        patientEmail: patientEmail,
        doctor: doctor,
        specialization: specialization,
        date: date,
        time: time,
        reason: reason,
        status: "Pending"
    };

    appointments.push(appointment);

    // Keep the name available to other pages during this browser session.
    sessionStorage.setItem("patientName", patientName);

    displayAppointments();

    showFormMessage(
        "Your appointment request has been added to this page. It is not yet saved to the hospital database.",
        "success-message"
    );

    appointmentForm.reset();

    doctorInput.replaceChildren();

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select a doctor";

    doctorInput.appendChild(defaultOption);
    doctorInput.disabled = false;

    dateInput.min = localToday;

    if (savedPatientName) {
        document.getElementById("patientName").value = savedPatientName;
    }
});

document.getElementById("logoutBtn").addEventListener("click", function () {
    sessionStorage.removeItem("patientName");

    window.location.href = "login.html";
});

updateDoctorList();
displayAppointments();