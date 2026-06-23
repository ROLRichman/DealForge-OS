function saveTrade() {
  const entry = document.getElementById("tradeResult").innerText;

  let journal = JSON.parse(localStorage.getItem("journal")) || [];
  journal.push({ trade: entry, time: new Date().toLocaleString() });

  localStorage.setItem("journal", JSON.stringify(journal));

  renderJournal();
}

function renderJournal() {
  const journal = JSON.parse(localStorage.getItem("journal")) || [];

  document.getElementById("journal").innerHTML =
    journal.map(j => `<p>${j.time} — ${j.trade}</p>`).join("");
}

renderJournal();
