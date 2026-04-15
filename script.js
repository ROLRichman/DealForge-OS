// =========================
// DEAL ENGINE
// =========================

function analyzeDeal(){

let arv = Number(document.getElementById("arv").value) || 0;
let price = Number(document.getElementById("price").value) || 0;

// --- 3 TIER SETTINGS (FROM YOU)
let cashPct = 0.50;
let sellerPct = 0.65;
let financePct = 0.75;

let downPct = 0.05;
let sellerRate = 0.05;
let financeRate = 0.06;

// --- CALCULATIONS
let cash = arv * cashPct;
let seller = arv * sellerPct;
let finance = arv * financePct;

// SELLER CARRY DETAILS
let down = seller * downPct;
let loanAmount = seller - down;

let monthly = (loanAmount * sellerRate) / 12;

// SELLER FINANCE DETAILS
let financeMonthly = (finance * financeRate) / 12;

// OVERAGE
let overage = arv - price;

// DEAL STATUS
let status = overage > 50000 ? "🔥 IT'S A DEAL!" : "⚠️ Tight Deal";

// DISPLAY
document.getElementById("results").innerHTML = `
<h3>💰 3 Tier Offers</h3>

<b>Cash:</b> $${cash.toFixed(0)}<br>

<b>Seller Carry:</b> $${seller.toFixed(0)}<br>
Down: $${down.toFixed(0)}<br>
Monthly: $${monthly.toFixed(0)}<br><br>

<b>Seller Finance:</b> $${finance.toFixed(0)}<br>
Monthly: $${financeMonthly.toFixed(0)}<br><br>

<b>Overage:</b> $${overage.toFixed(0)}<br>
<b>${status}</b>

<hr>

<i>
Cash = quick assignment<br>
Seller = small down, profit spread<br>
Finance = long-term cashflow play
</i>
`;

}
