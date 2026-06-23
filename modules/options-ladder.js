function runTrade() {
  const strategy = document.getElementById("strategy").value;
  const contracts = document.getElementById("contracts").value;

  const result = Math.random() > 0.55 ? "WIN ✅" : "LOSS ❌";

  document.getElementById("tradeResult").innerText =
    `${strategy} | ${contracts} contracts → ${result}`;
}
