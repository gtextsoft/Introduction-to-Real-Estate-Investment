const googleCalendarLink = document.getElementById("googleCalendarLink");
const icsDownloadLink = document.getElementById("icsDownloadLink");

const params = new URLSearchParams(window.location.search);
const selectedSession = params.get("session") || "Not specified";

const title = "Introduction to Real Estate Investment";
const details =
  "Live session on real estate investment opportunities in Dubai, USA, UK and Nigeria.";
const location = "Online Event";
const startUtc = "20260502T120000Z";
const endUtc = "20260502T140000Z";

const encodedTitle = encodeURIComponent(title);
const encodedDetails = encodeURIComponent(
  `${details} Preferred session selected: ${selectedSession}.`
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
  `DESCRIPTION:${details} Preferred session selected: ${selectedSession}.`,
  `LOCATION:${location}`,
  "END:VEVENT",
  "END:VCALENDAR",
].join("\r\n");

const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
icsDownloadLink.href = URL.createObjectURL(blob);
