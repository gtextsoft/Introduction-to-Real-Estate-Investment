const registrationForm = document.getElementById("registrationForm");
const errorMessage = document.getElementById("errorMessage");

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

  const redirectParams = new URLSearchParams();
  if (selectedSession) {
    redirectParams.set("session", selectedSession);
  }
  window.location.href =
    redirectParams.size > 0
      ? `thank-you.html?${redirectParams.toString()}`
      : "thank-you.html";
});

