const canvas = document.getElementById("chart");

if (canvas && window.marketData) {
  new Chart(canvas, {
    type: "line",
    data: {
      labels: ["9:30", "10:00", "10:30", "11:00", "11:30", "12:00"],
      datasets: [{
        label: "SPY",
        data: marketData.SPY
      }]
    }
  });
}
