let dealData = {};
let cogoTotal = 0;

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

// DEAL ANALYSIS
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

// REPAIRS
function calcRepairs(){
let r1 = +document.getElementById("r1").value || 0;
let r2 = +document.getElementById("r2").value || 0;
let r3 = +document.getElementById("r3").value || 0;
let r4 = +document.getElementById("r4").value || 0;

let total = r1 + r2 + r3 + r4;

document.getElementById("repairOut").innerHTML = "Total Rehab: $" + total;
}

// COGO
let cogoItems = ["Roofing","Electrical","Foundation","HVAC","Kitchen","Bathroom","Laundry Room"];

window.onload = function(){
let select = document.getElementById("cogoItem");

cogoItems.forEach(item=>{
let opt = document.createElement("option");
opt.text = item;
select.add(opt);
});

initSignature();
};

function addCogo(){
let item = document.getElementById("cogoItem").value;
let cost = +document.getElementById("cogoCost").value || 0;

cogoTotal += cost;

document.getElementById("cogoList").innerHTML += item + ": $" + cost + "<br>";
document.getElementById("cogoList").innerHTML += "<b>Total: $" + cogoTotal + "</b><br>";
}

// SIGNATURE FIXED
function initSignature(){
let canvas = document.getElementById("sig");
let ctx = canvas.getContext("2d");

canvas.width = 300;
canvas.height = 150;

ctx.lineWidth = 4;
ctx.lineCap = "round";

let drawing = false;

canvas.addEventListener("touchstart", e=>{ drawing = true; });
canvas.addEventListener("touchend", e=>{ drawing = false; });

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

// CLEAR
function clearSig(){
let canvas = document.getElementById("sig");
let ctx = canvas.getContext("2d");
ctx.clearRect(0,0,canvas.width,canvas.height);
}

// CONTRACT PDF
function generateContract(){

const { jsPDF } = window.jspdf;
let doc = new jsPDF();

let sig = document.getElementById("sig").toDataURL();

doc.text("PURCHASE AGREEMENT",10,10);
doc.text("Address: " + dealData.address,10,20);
doc.text("Price: $" + dealData.price,10,30);

doc.addImage(sig,"PNG",20,200,80,30);

doc.save("Purchase.pdf");
}

// BROKER
function brokerAgreement(){

const { jsPDF } = window.jspdf;
let doc = new jsPDF();

doc.text("BROKER AGREEMENT",10,10);
doc.text("Fee: 3%",10,20);

doc.save("Broker.pdf");
}

// PREAPP
function preApp(){

const { jsPDF } = window.jspdf;
let doc = new jsPDF();

doc.text("PRE-LOAN APPLICATION",10,10);
doc.text("Address: " + dealData.address,10,20);

doc.save("PreApp.pdf");
}

// ONE CLICK CLOSE
function oneClickClose(){

if(!dealData.address){
alert("Run deal first.");
return;
}

generateContract();
setTimeout(()=>{ brokerAgreement(); },500);
setTimeout(()=>{ preApp(); },1000);

let msg = encodeURIComponent(
"New Deal Ready\n" +
dealData.address +
"\nCall Richardson 267-808-5844"
);

window.open("sms:?body=" + msg);

alert("🔥 Deal Sent");
}
