let deal = {};
let cogoTotal = 0;

// =========================
// ANALYZE DEAL (CORE ENGINE)
// =========================
function analyzeDeal(){

let arv = +document.getElementById("arv").value || 0;
let price = +document.getElementById("price").value || 0;
let address = document.getElementById("address").value;

let cash = arv * 0.5;
let seller = arv * 0.65;
let finance = arv * 0.75;

let down = seller * 0.05;
let monthly = (seller - down) * 0.006;
let monthly2 = finance * 0.005;

let overage = arv - price;

deal = {arv, price, address, cash, seller, finance, down, monthly, monthly2, overage};

document.getElementById("results").innerHTML = `
<h3>💰 3 Tier Offers</h3>

Cash: $${cash.toFixed(0)}<br>

Seller Carry: $${seller.toFixed(0)}<br>
Down: $${down.toFixed(0)}<br>
Monthly: $${monthly.toFixed(0)}<br><br>

Seller Finance: $${finance.toFixed(0)}<br>
Monthly: $${monthly2.toFixed(0)}<br><br>

Overage: $${overage.toFixed(0)}<br>

<b style="color:#22c55e;">🔥 IT'S A DEAL!</b>

<p style="opacity:0.7;font-size:13px;">
Cash = quick assignment<br>
Seller = small down, profit spread<br>
Finance = long-term cashflow
</p>
`;
}

// =========================
// REPAIRS CALCULATOR
// =========================
function calcRepairs(){

let r1 = +document.getElementById("r1").value || 0;
let r2 = +document.getElementById("r2").value || 0;
let r3 = +document.getElementById("r3").value || 0;
let r4 = +document.getElementById("r4").value || 0;

let total = r1 + r2 + r3 + r4;

document.getElementById("repairOut").innerHTML =
"<b>Total Rehab: $" + total + "</b>";
}

// =========================
// FULL COGO LIST (YOUR LIST)
// =========================
let cogoItems = [
"Roofing","Electrical","Foundation","HVAC","Kitchen","Bathroom",
"Flooring","Painting","Plumbing","Windows","Framing",
"Insulation","Garage","Deck","Driveway","Landscaping",
"Drywall","Doors","Appliances","Lighting",
"Laundry Room"
];

window.onload = function(){

let select = document.getElementById("cogoItem");

cogoItems.forEach(item=>{
let opt = document.createElement("option");
opt.text = item;
select.add(opt);
});

initSignature();
};

// =========================
// ADD COGO ITEM
// =========================
function addCogo(){

let item = document.getElementById("cogoItem").value;
let cost = +document.getElementById("cogoCost").value || 0;

cogoTotal += cost;

document.getElementById("cogoList").innerHTML +=
item + ": $" + cost + "<br>";

document.getElementById("cogoList").innerHTML =
document.getElementById("cogoList").innerHTML +
"<b>Total: $" + cogoTotal + "</b><br>";
}

// =========================
// SIGNATURE (FIXED)
// =========================
function initSignature(){

let canvas = document.getElementById("sig");
let ctx = canvas.getContext("2d");

canvas.width = 300;
canvas.height = 150;

ctx.lineWidth = 4; // 🔥 thicker line
ctx.lineCap = "round";

let drawing = false;

canvas.addEventListener("touchstart", ()=> drawing = true);
canvas.addEventListener("touchend", ()=> drawing = false);

canvas.addEventListener("touchmove", e=>{
e.preventDefault();

if(!drawing) return;

let rect = canvas.getBoundingClientRect();
let touch = e.touches[0];

let x = touch.clientX - rect.left;
let y = touch.clientY - rect.top;

ctx.lineTo(x,y);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(x,y);
});
}

function clearSig(){
let canvas = document.getElementById("sig");
let ctx = canvas.getContext("2d");
ctx.clearRect(0,0,canvas.width,canvas.height);
}

// =========================
// CONTRACT (WORKING)
// =========================
function generateContract(){

const { jsPDF } = window.jspdf;
let doc = new jsPDF();

let sig = document.getElementById("sig").toDataURL();

let text = `
PURCHASE AGREEMENT

Buyer: Root Of Lyfe Holdings LLC
Address: ${deal.address}

Price: $${deal.price}
ARV: $${deal.arv}

TERMS:
- Assignable
- 14 Day Inspection
- Buyer may cancel
- Marketing rights allowed
- Double close allowed
- Non-circumvention enforced

Broker:
Richardson L
richman@rootoflyfe.com
`;

doc.text(text, 10, 10);
doc.addImage(sig, "PNG", 20, 200, 80, 30);

doc.save("Purchase-Agreement.pdf");
}

// =========================
// BROKER AGREEMENT
// =========================
function brokerAgreement(){

const { jsPDF } = window.jspdf;
let doc = new jsPDF();

doc.text(`
BROKER AGREEMENT

Broker: Root Of Lyfe Holdings LLC
Fee: 3%

Client agrees to pay 3% upon closing.

Non-circumvention applies.
`, 10, 10);

doc.save("Broker-Agreement.pdf");
}

// =========================
// PRE APPLICATION
// =========================
function preApp(){

const { jsPDF } = window.jspdf;
let doc = new jsPDF();

doc.text(`
PRE-LOAN APPLICATION

Property: ${deal.address}
Price: $${deal.price}
ARV: $${deal.arv}

Estimated Profit: $${deal.overage}

Broker:
Richardson L
richman@rootoflyfe.com
`, 10, 10);

doc.save("PreApp.pdf");
}

// =========================
// ONE CLICK CLOSE 🔥
// =========================
function oneClickClose(){

generateContract();
brokerAgreement();
preApp();

sendText();

alert("🔥 Deal Sent + Contracts Generated");
}

// =========================
// LINKS
// =========================
function openZillow(){
let addr = document.getElementById("address").value;
window.open("https://www.zillow.com/homes/" + encodeURIComponent(addr));
}

function openRedfin(){
let addr = document.getElementById("address").value;
window.open("https://www.redfin.com/search?q=" + encodeURIComponent(addr));
}

function openRural(){
window.open("https://eligibility.sc.egov.usda.gov/");
}

// =========================
// TEXT MESSAGE
// =========================
function sendText(){
let msg = encodeURIComponent(
"New Deal Ready 📲\n" +
"Address: " + deal.address + "\n" +
"ARV: $" + deal.arv + "\n" +
"Price: $" + deal.price + "\n\n" +
"Contact Richardson: 267-808-5844"
);

window.open("sms:?body=" + msg);
}
