let dealData = {};
let cogoItems = [];
let ctx, drawing = false;

// =======================
// DEAL ANALYSIS
// =======================
function analyzeDeal(){

let arv = +document.getElementById("arv").value;
let price = +document.getElementById("price").value;
let address = document.getElementById("address").value;

let cash = arv * 0.5;
let seller = arv * 0.65;
let finance = arv * 0.75;

let down = seller * 0.05;
let monthly = (seller - down) * 0.006;
let monthly2 = finance * 0.005;

let overage = arv - price;

dealData = {arv, price, address, cash, seller, finance, down, monthly, monthly2, overage};

document.getElementById("results").innerHTML = `
<h3>💰 3 Tier Offers</h3>

Cash: $${cash.toFixed(0)}<br>
Seller Carry: $${seller.toFixed(0)}<br>
Down: $${down.toFixed(0)}<br>
Monthly: $${monthly.toFixed(0)}<br><br>

Seller Finance: $${finance.toFixed(0)}<br>
Monthly: $${monthly2.toFixed(0)}<br><br>

Overage: $${overage.toFixed(0)}<br>

<b>🔥 IT'S A DEAL!</b>
`;
}

// =======================
// QUICK REPAIRS
// =======================
function calcRepairs(){

let total = ["r1","r2","r3","r4"]
.map(id => +document.getElementById(id).value || 0)
.reduce((a,b)=>a+b,0);

document.getElementById("repairOut").innerHTML =
`Total Rehab: $${total}`;
}

// =======================
// COGO INSPECTION
// =======================
const cogoListData = [
"Roofing","Electrical","Plumbing","HVAC","Kitchen","Bathroom","Foundation"
];

window.onload = () => {

let select = document.getElementById("cogoItem");

cogoListData.forEach(i=>{
let opt = document.createElement("option");
opt.textContent = i;
select.appendChild(opt);
});

initSignature();
};

// ADD ITEM
function addCogo(){

let item = document.getElementById("cogoItem").value;
let cost = +document.getElementById("cogoCost").value || 0;

cogoItems.push({item,cost});

let html = "";
let total = 0;

cogoItems.forEach(i=>{
html += `${i.item}: $${i.cost}<br>`;
total += i.cost;
});

html += `<b>Total: $${total}</b>`;

document.getElementById("cogoList").innerHTML = html;
}

// =======================
// SIGNATURE (FIXED MOBILE)
// =======================
function initSignature(){

let canvas = document.getElementById("sig");
ctx = canvas.getContext("2d");

canvas.width = 300;
canvas.height = 150;

// STOP SCROLL WHILE SIGNING
canvas.addEventListener("touchstart", e=>{
drawing = true;
e.preventDefault();
});

canvas.addEventListener("touchend", ()=>{
drawing = false;
ctx.beginPath();
});

canvas.addEventListener("touchmove", e=>{
if(!drawing) return;

let rect = canvas.getBoundingClientRect();
let touch = e.touches[0];

ctx.lineWidth = 4;
ctx.lineCap = "round";

ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
ctx.stroke();
});

// MOUSE
canvas.addEventListener("mousedown", ()=>{
drawing = true;
});

canvas.addEventListener("mouseup", ()=>{
drawing = false;
ctx.beginPath();
});

canvas.addEventListener("mousemove", e=>{
if(!drawing) return;

ctx.lineWidth = 4;
ctx.lineCap = "round";

ctx.lineTo(e.offsetX, e.offsetY);
ctx.stroke();
});
}

function clearSig(){
ctx.clearRect(0,0,300,150);
}

// =======================
// PDF EXPORT
// =======================
function exportPDF(){

const { jsPDF } = window.jspdf;
let doc = new jsPDF();

doc.text("DEAL REPORT", 20, 20);

let content = document.getElementById("results").innerText;

doc.text(content, 20, 40);

// SIGNATURE
let sig = document.getElementById("sig").toDataURL();
doc.addImage(sig, "PNG", 20, 120, 100, 40);

doc.save("DealForge-Report.pdf");
}

// =======================
// PURCHASE AGREEMENT
// =======================
function generateContract(){

const { jsPDF } = window.jspdf;
let doc = new jsPDF();

let sig = document.getElementById("sig").toDataURL();

let contract = `
PURCHASE AGREEMENT

Buyer: Root Of Lyfe Holdings LLC
Address: ${dealData.address}

Purchase Price: $${dealData.price}
ARV: $${dealData.arv}

TERMS:
- Assignable contract
- 14-day inspection contingency
- Buyer may cancel without penalty
- Marketing rights granted
- Double closing allowed
- Seller agrees not to circumvent

EXIT:
Wholesale / Refinance / Flip

Buyer:
Richardson L.
`;

doc.text(contract, 10, 10);
doc.addImage(sig, "PNG", 20, 180, 80, 30);

doc.save("Purchase-Agreement.pdf");
}

// =======================
// BROKER AGREEMENT
// =======================
function brokerAgreement(){

const { jsPDF } = window.jspdf;
let doc = new jsPDF();

let text = `
CLIENT BROKER FEE AGREEMENT

Broker: Root Of Lyfe Holdings LLC
Fee: 3%

Client agrees to pay 3% upon funding.

Non-Circumvention enforced.

Richardson L.
richman@rootoflyfe.com
`;

doc.text(text, 10, 10);
doc.save("Broker-Agreement.pdf");
}

// =======================
// PRE APPLICATION
// =======================
function preApp(){

const { jsPDF } = window.jspdf;
let doc = new jsPDF();

let text = `
PRE-LOAN APPLICATION

Broker:
Root Of Lyfe Holdings LLC

Property:
${dealData.address}

Purchase:
$${dealData.price}

ARV:
$${dealData.arv}

Profit:
$${dealData.overage}
`;

doc.text(text, 10, 10);
doc.save("PreApp.pdf");
}

// =======================
// SEND TEXT
// =======================
function sendText(){

let msg = encodeURIComponent(
`New Deal:
${dealData.address}

ARV: $${dealData.arv}
Price: $${dealData.price}

Call: 267-808-5844`
);

window.open(`sms:2678085844?body=${msg}`);
}

// =======================
// LINKS
// =======================
function openZillow(){
let a = document.getElementById("address").value;
window.open("https://www.zillow.com/homes/"+encodeURIComponent(a));
}

function openRedfin(){
let a = document.getElementById("address").value;
window.open("https://www.redfin.com/search?q="+encodeURIComponent(a));
}

function openRural(){
window.open("https://eligibility.sc.egov.usda.gov/");
                   }
