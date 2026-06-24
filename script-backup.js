function updateSession() {
  const hour = new Date().getHours();

  let session = "";

  if (hour >= 4 && hour < 9) session = "Pre-Market — News-driven, thin liquidity";
  else if (hour >= 9 && hour < 11) session = "Opening Bell — High volatility zone";
  else if (hour >= 11 && hour < 14) session = "Midday Chop — Avoid low conviction trades";
  else if (hour >= 14 && hour < 16) session = "Power Hour — Trend continuation setups";
  else session = "After Hours — Risk elevated, low liquidity";

  document.getElementById("session").innerText = session;
}

updateSession();
setInterval(updateSession, 60000);


// SIMPLE OPTIONS SIMULATION (PHASE 1)
function simulateTrade() {
  const strategy = document.getElementById("strategy").value;
  const ticker = document.getElementById("ticker").value;

  const outcome = Math.random();

  let result = "";

  if (outcome > 0.6) {
    result = `✅ WIN: ${strategy} on ${ticker}`;
  } else {
    result = `❌ LOSS: ${strategy} on ${ticker}`;
  }

  document.getElementById("result").innerText = result;
}


// BASIC CHART
const ctx = document.getElementById('marketChart');

if (ctx) {
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['9:30', '10:00', '10:30', '11:00', '11:30', '12:00'],
      datasets: [{
        label: 'Market Trend',
        data: [450, 452, 448, 451, 453, 449]
      }]
    }
  });
}
