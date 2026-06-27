console.log("ENGINE LOADED");

// SESSION
function updateSession() {
  const hour = new Date().getHours();

  let session = "";

  if (hour >= 4 && hour < 9) session = "Pre-Market — News-driven, thin liquidity";
  else if (hour >= 9 && hour < 11) session = "Opening Bell — High volatility zone";
  else if (hour >= 11 && hour < 14) session = "Midday Chop — Avoid low conviction trades";
  else if (hour >= 14 && hour < 16) session = "Power Hour — Trend continuation setups";
  else session = "After Hours — Risk elevated";

  const el = document.getElementById("session");
  if (el) el.innerText = session;
}

updateSession();
setInterval(updateSession, 60000);
