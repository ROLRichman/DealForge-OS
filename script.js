let deal = {};
let cogoTotal = 0;

// ===== ANALYZE DEAL =====
function analyzeDeal(){

let arv = +document.getElementById("arv").value || 0;
let price = +document.getElementById("price").value || 0;

let cash = arv * 0.5;
let seller = arv * 0.65;
let finance = arv * 0.75;

let down = seller * 0.05;
let monthly = (seller - down) * 0.006;
let monthly2 = finance * 0.005;

let overage = arv - price;

deal = {arv, price, cash, seller, finance, down, monthly, monthly2, overage};

document.getElementById("results").innerHTML = `
<h3>💰 3 Tier Offers</h3>

Cash: $${cash.toFixed(0)}<br>

Seller Carry: $${seller.toFixed(0)}<br>
Down: $${down.toFixed(0)}<br>
Monthly: $${monthly.toFixed(0)}<br><br>

Seller Finance: $${finance.toFixed(0)}<br>
Monthly: $${monthly2.toFixed(0)}<br><br>

Overage: $${overage.toFixed(0)}<br>

<b style="color:#22c55e;">🔥 IT'S A DEAL</b>
`;
}

// ===== REPAIRS =====
function calcRepairs(){

let total =
(+r1.value||0)+(+r2.value||0)+(+r3.value||0)+(+r4.value||0);

repairOut.innerHTML = "Total Rehab: $" + total;
}

// ===== COGO =====
let cogoItems = [
"Roofing","Electrical","Foundation","HVAC","Kitchen","Bathroom",
"Flooring","Painting","Plumbing","Windows","Laundry Room"
];

window.onload = function(){
let select = document.getElementById("cogoItem");
cogoItems.forEach(i=>{
let o = document.createElement("option");
o.text = i;
select.add(o);
});
initSignature();
};

function addCogo(){

let item = cogoItem.value;
let cost = +cogoCost.value || 0;

cogoTotal += cost;

cogoList.innerHTML += item + ": $" + cost + "<br>";
cogoList.innerHTML += "<b>Total: $" + cogoTotal + "</b><br>";
}

// ===== SIGNATURE =====
function initSignature(){

let canvas = document.getElementById("sig");
let ctx = canvas.getContext("2d");

canvas.width = 300;
canvas.height = 150;

ctx.lineWidth = 4;

let drawing = false;

canvas.addEventListener("touchstart", ()=> drawing=true);
canvas.addEventListener("touchend", ()=> drawing=false);

canvas.addEventListener("touchmove", e=>{
e.preventDefault();
if(!drawing) return;

let r = canvas.getBoundingClientRect();
let t = e.touches[0];

ctx.lineTo(t.clientX-r.left, t.clientY-r.top);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(t.clientX-r.left, t.clientY-r.top);
});
}

function clearSig(){
sig.getContext("2d").clearRect(0,0,300,150);
}

// ===== PDF EXPORT =====
function exportPDF(){

const { jsPDF } = window.jspdf;
let doc = new jsPDF();

doc.text("Deal Report",10,10);
doc.text(`ARV: $${deal.arv}`,10,20);
doc.text(`Price: $${deal.price}`,10,30);
doc.text(`Profit: $${deal.overage}`,10,40);

doc.save("Deal-Report.pdf");
}

// ===== PURCHASE AGREEMENT =====
function generateContract(){

const { jsPDF } = window.jspdf;
let doc = new jsPDF();

let sigImg = sig.toDataURL();

doc.text(`PURCHASE AGREEMENT

Buyer: Root Of Lyfe Holdings LLC
Price: $${deal.price}
ARV: $${deal.arv}

TERMS:
- Assignable
- 14 day inspection
- Buyer may cancel
- Marketing allowed
- Double close allowed

Richardson L
`,10,10);

doc.addImage(sigImg,"PNG",20,200,80,30);

doc.save("Purchase.pdf");
}

// ===== BROKER AGREEMENT =====
function brokerAgreement(){

const { jsPDF } = window.jspdf;
let doc = new jsPDF();

doc.text(`BROKER AGREEMENT

Broker: Root Of Lyfe Holdings LLC
Fee: 3%

Client agrees to pay 3% at closing.
`,10,10);

doc.save("Broker.pdf");
}

// ===== PRE APP =====
function preApp(){

const { jsPDF } = window.jspdf;
let doc = new jsPDF();

doc.text(`PRE APPLICATION

Price: $${deal.price}
ARV: $${deal.arv}

Profit: $${deal.overage}

Broker: Richardson L
richman@rootoflyfe.com
`,10,10);

doc.save("PreApp.pdf");
}

// ===== ONE CLICK CLOSE =====
function oneClickClose(){

exportPDF();
generateContract();
brokerAgreement();
preApp();

alert("🔥 DEAL CLOSED SYSTEM FIRED");
}

// ===== LINKS =====
function openZillow(){
window.open("https://www.zillow.com/homes/" + encodeURIComponent(address.value));
}

function openRedfin(){
window.open("https://www.redfin.com/search?q=" + encodeURIComponent(address.value));
}

function openRural(){
window.open("https://eligibility.sc.egov.usda.gov/");
                        }
