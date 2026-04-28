const registrationForm = document.getElementById("registrationForm");
const errorMessage = document.getElementById("errorMessage");
const formSection = document.getElementById("formSection");
const successSection = document.getElementById("successSection");
const googleCalendarLink = document.getElementById("googleCalendarLink");
const icsDownloadLink = document.getElementById("icsDownloadLink");

function buildCalendarDetails(sessionValue) {
  const title = "Introduction to Real Estate Investment";
  const details =
    "Live session on real estate investment opportunities in Dubai, USA, UK and Nigeria.";
  const location = "Online Event";
  const startUtc = "20260502T120000Z";
  const endUtc = "20260502T140000Z";

  const encodedTitle = encodeURIComponent(title);
  const encodedDetails = encodeURIComponent(
    `${details} Preferred session selected: ${sessionValue}.`
  );
  const encodedLocation = encodeURIComponent(location);

  googleCalendarLink.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodedTitle}&dates=${startUtc}%2F${endUtc}&details=${encodedDetails}&location=${encodedLocation}`;

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Stephen Akintayo Foundation//IRI Event//EN",
    "BEGIN:VEVENT",
    "UID:iri-event-20260502@stephenakintayo.com",
    "DTSTAMP:20260428T160000Z",
    `DTSTART:${startUtc}`,
    `DTEND:${endUtc}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${details} Preferred session selected: ${sessionValue}.`,
    `LOCATION:${location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  icsDownloadLink.href = URL.createObjectURL(blob);
}

registrationForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorMessage.textContent = "";

  if (!registrationForm.checkValidity()) {
    errorMessage.textContent =
      "Please complete all required fields before submitting.";
    registrationForm.reportValidity();
    return;
  }

  const marketsSelected = Array.from(
    document.getElementById("markets").selectedOptions
  ).length;

  if (marketsSelected === 0) {
    errorMessage.textContent = "Please select at least one market of interest.";
    return;
  }

  const selectedSession = document.querySelector(
    'input[name="sessionTime"]:checked'
  )?.value;

  const submitButton = registrationForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = "Submitting...";

  try {
    const response = await fetch(registrationForm.action, {
      method: "POST",
      body: new FormData(registrationForm),
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Submission failed");
    }
  } catch (error) {
    errorMessage.textContent =
      "We could not submit your form right now. Please try again.";
    submitButton.disabled = false;
    submitButton.textContent = "Register Now";
    return;
  }

  buildCalendarDetails(selectedSession || "Not specified");
  formSection.classList.add("hidden");
  successSection.classList.remove("hidden");
  successSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

