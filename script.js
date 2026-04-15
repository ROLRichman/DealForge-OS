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


function calcRepairs(){

let r1 = Number(document.getElementById("r1").value) || 0;
let r2 = Number(document.getElementById("r2").value) || 0;
let r3 = Number(document.getElementById("r3").value) || 0;
let r4 = Number(document.getElementById("r4").value) || 0;

let total = r1 + r2 + r3 + r4;

document.getElementById("repairsOut").innerHTML =
"Total Rehab: $" + total.toFixed(0);

}

const cogoItems = [
"Roofing","Electrical Rough","Electrical Finish","Plumbing Rough","Plumbing Finish",
"HVAC","Kitchen","Bathroom","Flooring","Framing","Foundation","Windows","Doors",
"Drywall","Painting","Demolition","Garage","Driveway","Landscaping",
"Insulation","Tile","Siding","Concrete","Trash Out","Permit Fees","Plans"
];

function loadCogo(){
let select = document.getElementById("cogoItem");
select.innerHTML = "";

cogoItems.forEach(item=>{
let opt = document.createElement("option");
opt.value = item;
opt.text = item;
select.appendChild(opt);
});
}

function addCogo(){

let item = document.getElementById("cogoItem").value;
let price = Number(document.getElementById("cogoPrice").value) || 0;

let div = document.createElement("div");
div.innerHTML = `${item}: $${price}`;

document.getElementById("cogoList").appendChild(div);

  }
