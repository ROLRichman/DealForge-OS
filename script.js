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
alert("Enter ARV & Price");
return;
}

let cash = arv * 0.5;
let seller = arv * 0.65;
let finance = arv * 0.75;

let down = seller * 0.05;
let monthly = (seller - down) * 0.006;
let monthly2 = finance * 0.005;

let overage = arv - price;

dealData = {arv, price, cash, seller, finance, down, monthly, monthly2, overage};

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

// REPAIRS
function calcRepairs(){
let r1 = +document.getElementById("r1").value || 0;
let r2 = +document.getElementById("r2").value || 0;
let r3 = +document.getElementById("r3").value || 0;
let r4 = +document.getElementById("r4").value || 0;

let total = r1 + r2 + r3 + r4;

document.getElementById("repairOut").innerHTML =
"Total Rehab: $" + total;
}

// FULL COGO LIST
let cogoItems = [
"Roofing","Electrical","Plumbing","HVAC","Kitchen","Bathroom",
"Flooring","Windows","Foundation","Framing","Painting",
"Drywall","Demolition","Landscaping","Garage","Laundry Room"
];

let cogoTotal = 0;

window.onload = function(){
let select = document.getElementById("cogoItem");

cogoItems.forEach(item=>{
let opt = document.createElement("option");
opt.text = item;
select.add(opt);
});

initSignature();
}

// ADD COGO
function addCogo(){
let item = document.getElementById("cogoItem").value;
let cost = +document.getElementById("cogoCost").value || 0;

cogoTotal += cost;

document.getElementById("cogoList").innerHTML +=
item + ": $" + cost + "<br>";

document.getElementById("cogoList").innerHTML =
"<b>Total: $" + cogoTotal + "</b><br>" + document.getElementById("cogoList").innerHTML;
}

// SIGNATURE
function initSignature(){
let canvas = document.getElementById("sig");
let ctx = canvas.getContext("2d");

canvas.width = 300;
canvas.height = 150;

ctx.lineWidth = 3;
ctx.lineCap = "round";

let drawing = false;

canvas.addEventListener("touchstart", ()=> drawing = true);
canvas.addEventListener("touchend", ()=> drawing = false);

canvas.addEventListener("touchmove", e=>{
e.preventDefault();
if(!drawing) return;

let rect = canvas.getBoundingClientRect();
let t = e.touches[0];

let x = t.clientX - rect.left;
let y = t.clientY - rect.top;

ctx.lineTo(x,y);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(x,y);
});
}

function clearSig(){
let canvas = document.getElementById("sig");
canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height);
}

// PDF FUNCTIONS
function generateContract(){
const { jsPDF } = window.jspdf;
let doc = new jsPDF();

doc.text("PURCHASE AGREEMENT - RO'LYFE", 10, 10);
doc.text("Price: $" + dealData.price, 10, 20);
doc.text("ARV: $" + dealData.arv, 10, 30);
doc.text("Overage: $" + dealData.overage, 10, 40);

doc.save("Purchase.pdf");
}

function brokerAgreement(){
const { jsPDF } = window.jspdf;
let doc = new jsPDF();

doc.text("BROKER AGREEMENT - 3% FEE", 10, 10);
doc.text("Broker: Richardson L.", 10, 20);

doc.save("Broker.pdf");
}

function preApp(){
const { jsPDF } = window.jspdf;
let doc = new jsPDF();

doc.text("PRE LOAN APPLICATION", 10, 10);
doc.text("Property: " + document.getElementById("address").value, 10, 20);

doc.save("PreApp.pdf");
}

// ONE CLICK CLOSE
function oneClickClose(){
generateContract();
brokerAgreement();
preApp();

let msg = encodeURIComponent("Deal Ready - Call Richardson 267-808-5844");
window.open("sms:?body=" + msg);
}
