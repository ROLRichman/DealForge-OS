const ticker = document.getElementById("tickerSelect");

function updateMarket() {
  const symbol = ticker.value;
  const data = marketData[symbol];

  const latest = data[data.length - 1];

  document.getElementById("price").innerText = `$${latest}`;

  const trend = data[data.length - 1] > data[data.length - 2]
    ? "Bullish 📈"
    : "Bearish 📉";

  document.getElementById("trend").innerText = trend;
}

ticker.addEventListener("change", updateMarket);
updateMarket();
