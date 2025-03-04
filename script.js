document.addEventListener('DOMContentLoaded', function () {
    // Countdown code remains the same
    const eventDate = new Date("2025-07-05T00:00:00");
    const daysSpan = document.getElementById("days");
    const hoursSpan = document.getElementById("hours");
    const minutesSpan = document.getElementById("minutes");
    const secondsSpan = document.getElementById("seconds");

    function updateCountdown() {
        const now = new Date();
        const diff = eventDate - now;

        if (diff <= 0) {
            daysSpan.textContent = 0;
            hoursSpan.textContent = 0;
            minutesSpan.textContent = 0;
            secondsSpan.textContent = 0;
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        daysSpan.textContent = days;
        hoursSpan.textContent = hours;
        minutesSpan.textContent = minutes;
        secondsSpan.textContent = seconds;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Toggle name fields based on number of persons selected
    document.getElementById('numar_persoane').addEventListener('change', function () {
        const value = this.value;
        const primaryField = document.getElementById('nume-field');
        const partnerField = document.getElementById('partner-field');
        const nume1Input = document.getElementById('nume1');
        const nume2Input = document.getElementById('nume2');

        if (value === "1") {
            primaryField.style.display = "block";
            partnerField.style.display = "none";
            nume1Input.setAttribute('required', 'required');
            nume2Input.removeAttribute('required');
        } else if (value === "2") {
            primaryField.style.display = "block";
            partnerField.style.display = "block";
            nume1Input.setAttribute('required', 'required');
            nume2Input.setAttribute('required', 'required');
        } else {
            // When nothing is selected, hide both fields
            primaryField.style.display = "none";
            partnerField.style.display = "none";
            nume1Input.removeAttribute('required');
            nume2Input.removeAttribute('required');
        }
    });

    // Form submission code
    const form = document.getElementById("rsvp-form");
    const confirmationMsg = document.getElementById("confirmation");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Collect form data, including conditional fields
        const formData = {
            numar_persoane: document.getElementById("numar_persoane").value,
            copii: document.getElementById("copii").value,
            meniu: document.getElementById("meniu").value,
            transport: document.getElementById("transport").value,
            informatii: document.getElementById("informatii").value,
            email: document.getElementById("nume1").value,
            partener: document.getElementById("numar_persoane").value === "2" ? document.getElementById("nume2").value : ""
        };

        // Replace with your actual Google Apps Script Web App URL
        const scriptURL = "https://script.google.com/macros/s/AKfycbzt-jR9tC2T8TlFmtSKdSj2iQosM_a9MLbVJR_DP8qLM0qcg2I3gTIldfmLh2EWXMAs0g/exec";

        fetch(scriptURL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(() => {
                form.style.display = "none";
                confirmationMsg.style.display = "block";
            })
            .catch(error => {
                console.error("Eroare:", error);
                alert("Eroare la trimiterea formularului. Încercați din nou.");
            });
    });

    document.getElementById('navbar-toggle').addEventListener('click', function () {
        document.getElementById('navbar-menu').classList.toggle('active');
    });
});
