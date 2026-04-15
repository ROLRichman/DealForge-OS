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

if(!arv || !price){
alert("Enter ARV and Price");
return;
}

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

<b style="color:#22c55e;">🔥 IT'S A DEAL!</b>
`;

// SHOW NEXT STEP (FUNNEL FLOW)
document.getElementById("nextStep").style.display = "block";
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
// FULL COGO LIST (YOUR LENDER LIST)
// =======================
const cogoListData = [
"Architect","Asphalt & Paving","Basement","Bathroom Tile","Bathroom Vanity",
"Carpentry Rough","Ceiling Work","Closet / Shelves","Concrete",
"Demolition","Drywall","Electrical Finish","Electrical Rough",
"Exterior Painting","Fencing","Flooring","Foundation",
"Framing","Garage","HVAC","Insulation","Interior Painting",
"Kitchen","Kitchen Cabinets","Kitchen Countertops",
"Landscaping","Laundry Room","Light Fixtures",
"Masonry","Misc","Permit Fees","Plumbing",
"Roofing","Sewer","Siding","Stairs","Structural",
"Tile","Trash Out","Water Heater","Windows"
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

// =======================
// ADD COGO ITEM
// =======================
function addCogo(){

let item = document.getElementById("cogoItem").value;
let cost = +document.getElementById("cogoCost").value || 0;

if(!cost){
alert("Enter cost");
return;
}

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
// SIGNATURE (FIXED)
// =======================
function initSignature(){

let canvas = document.getElementById("sig");
ctx = canvas.getContext("2d");

canvas.width = 300;
canvas.height = 150;

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

canvas.addEventListener("mousedown", ()=>drawing=true);
canvas.addEventListener("mouseup", ()=>{drawing=false;ctx.beginPath();});

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
// PURCHASE AGREEMENT
// =======================
function generateContract(){

if(!dealData.address){
alert("Run deal first");
return;
}

const { jsPDF } = window.jspdf;
let doc = new jsPDF();

let sig = document.getElementById("sig").toDataURL();

let text = `
PURCHASE AGREEMENT

Buyer: Root Of Lyfe Holdings LLC
Address: ${dealData.address}

Price: $${dealData.price}
ARV: $${dealData.arv}

CLAUSES:
✔ Assignable
✔ Inspection contingency
✔ Cancel anytime during inspection
✔ Marketing rights
✔ Double close allowed
✔ Non-circumvention

Buyer:
Richardson L.
`;

doc.text(text,10,10);
doc.addImage(sig,"PNG",20,180,80,30);

doc.save("Purchase-Agreement.pdf");

alert("Purchase Agreement Generated ✅");
}

// =======================
// BROKER AGREEMENT (FIXED)
// =======================
function brokerAgreement(){

const { jsPDF } = window.jspdf;
let doc = new jsPDF();

doc.text(`
CLIENT BROKER AGREEMENT

Broker: Root Of Lyfe Holdings LLC
Fee: 3%

Client agrees to pay broker upon funding.

Non-circumvention enforced.

Richardson L.
richman@rootoflyfe.com
`,10,10);

doc.save("Broker-Agreement.pdf");

alert("Broker Agreement Ready ✅");
}

// =======================
// PRE APP (WITH CONFIRM)
// =======================
function preApp(){

if(!dealData.address){
alert("Run deal first");
return;
}

const { jsPDF } = window.jspdf;
let doc = new jsPDF();

doc.text(`
PRE-LOAN APPLICATION

Property: ${dealData.address}

Price: $${dealData.price}
ARV: $${dealData.arv}
Profit: $${dealData.overage}

Broker:
Root Of Lyfe Holdings LLC
richman@rootoflyfe.com
`,10,10);

doc.save("PreApp.pdf");

alert("Pre Application Ready ✅");
}

// =======================
// TEXT OFFER
// =======================
function sendText(){

if(!dealData.address){
alert("Run deal first");
return;
}

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
