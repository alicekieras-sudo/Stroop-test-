document.getElementById("infoForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);

  const consent = formData.get("Consent");
  if (consent !== "Y") {
    alert("You have to give consent to participate in this study");
    return;
  }

  const participantID = Date.now() + "-" + Math.floor(Math.random()*1000);
  formData.append("participantID", participantID);
  localStorage.setItem("participantID", participantID);

  const practiceDone = localStorage.getItem("practiceDone") || "N";
  formData.append("Practice", practiceDone);

  fetch(
    "https://script.google.com/macros/s/AKfycbxGItNSxbi7sEixhi0BfltUnl4EK3mQDX1nmmlo3LmykY65W422FJVkfDefz1ZZ5rA3/exec",
    {
      method: "POST",
      body: formData
    }
  ).then(() => {
    window.location.href = "Test.html";
  });
});
