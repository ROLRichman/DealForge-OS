function updateSession() {
  const hour = new Date().getHours();

  let session = "";

  if (hour < 9) session = "Pre-Market — low liquidity";
  else if (hour < 11) session = "Opening Volatility — high risk zone";
  else if (hour < 14) session = "Midday Chop — patience required";
  else if (hour < 16) session = "Power Hour — trend continuation";
  else session = "After Hours — avoid unless news";

  document.getElementById("session").innerText = session;
}

updateSession();
setInterval(updateSession, 60000);
