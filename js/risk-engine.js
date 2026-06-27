function updateRisk() {
  const risk = Math.random() * 10;

  let status = "";

  if (risk < 3) status = "LOW RISK 🟢";
  else if (risk < 7) status = "MODERATE ⚠️";
  else status = "HIGH RISK 🔴";

  document.getElementById("risk").innerText = status;
}

updateRisk();
