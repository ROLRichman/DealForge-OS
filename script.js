let dealData = {};

// LINKS
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

// ANALYZE DEAL (FIXED)
function analyzeDeal(){

let arv = +document.getElementById("arv").value;
let price = +document.getElementById("price").value;

if(!arv || !price){
alert("Enter numbers");
return;
}

let overage = arv - price;
let profit = (arv * 0.7) - price;

let label = profit > 50000 ? "🔥 SOLID DEAL" : "⚠️ CHECK NUMBERS";

dealData = {arv, price, overage, profit};

document.getElementById("dealResult").innerHTML = `
<h3>💰 Deal Analysis</h3>
ARV: $${arv}<br>
Price: $${price}<br>
Overage: $${overage}<br>
Profit Spread: $${profit}<br><br>

<b>${label}</b>
`;
}

// 3 TIER ENGINE
function run3Tier(){

let arv = +document.getElementById("tierArv").value;

let cash = arv * 0.5;
let seller = arv * 0.65;
let finance = arv * 0.75;

document.getElementById("tierResults").innerHTML = `
Cash: $${cash.toFixed(0)}<br>
Seller Carry: $${seller.toFixed(0)}<br>
Seller Finance: $${finance.toFixed(0)}
`;
}

// REPAIRS
function calcRepairs(){
let total =
(+r1.value||0)+(+r2.value||0)+(+r3.value||0)+(+r4.value||0);

repairOut.innerHTML = "Total Rehab: $" + total;
}

// FULL COGO LIST
let cogoItems = [
"Roofing","Electrical","Plumbing","HVAC","Kitchen","Bathroom",
"Flooring","Windows","Foundation","Framing","Drywall","Paint",
"Demolition","Landscaping","Driveway","Garage","Laundry Room"
];

let cogoTotal = 0;

window.onload = function(){
let select = document.getElementById("cogoItem");
cogoItems.forEach(i=>{
let opt = document.createElement("option");
opt.text = i;
select.add(opt);
});
initSignature();
}

function addCogo(){
let item = cogoItem.value;
let cost = +cogoCost.value || 0;

cogoTotal += cost;

cogoList.innerHTML =
"<b>Total: $" + cogoTotal + "</b><br>" +
item + ": $" + cost + "<br>" +
cogoList.innerHTML;
}

// SIGNATURE FIXED
function initSignature(){
let canvas = document.getElementById("sig");
let ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = 150;

let drawing = false;

canvas.addEventListener("touchstart", ()=> drawing = true);
canvas.addEventListener("touchend", ()=> drawing = false);

canvas.addEventListener("touchmove", e=>{
e.preventDefault();
if(!drawing) return;

let rect = canvas.getBoundingClientRect();
let t = e.touches[0];

ctx.lineTo(t.clientX-rect.left, t.clientY-rect.top);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(t.clientX-rect.left, t.clientY-rect.top);
});
}

function clearSig(){
sig.getContext("2d").clearRect(0,0,sig.width,sig.height);
}

// PDF
function generatePDF(){
const { jsPDF } = window.jspdf;
let doc = new jsPDF();

doc.text("DEAL SUMMARY",10,10);
doc.text("ARV: $" + dealData.arv,10,20);
doc.text("Price: $" + dealData.price,10,30);
doc.text("Overage: $" + dealData.overage,10,40);

doc.save("Deal.pdf");
}

// EMAIL
function sendEmail(){
let subject = "New Deal";
let body = `Deal:\n${dealData.arv} ARV\n${dealData.price} Price`;

window.open(`mailto:?subject=${subject}&body=${body}`);
}

// SMS
function sendText(){
window.open("sms:?body=New Deal Ready - Call Richardson");
}

// ONE CLICK CLOSE
function oneClickClose(){
generatePDF();
sendEmail();
sendText();
alert("Deal Sent 🚀");
}
