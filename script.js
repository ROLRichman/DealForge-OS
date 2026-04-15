let deal = {};
let cogoTotal = 0;

// ===== ANALYZE =====
function analyzeDeal(){

let arv = parseFloat(document.getElementById("arv").value) || 0;
let price = parseFloat(document.getElementById("price").value) || 0;

let cash = arv * 0.5;
let seller = arv * 0.65;
let finance = arv * 0.75;

let overage = arv - price;

deal = {arv, price};

document.getElementById("results").innerHTML = `
<h3>Offers</h3>
Cash: $${cash}<br>
Seller: $${seller}<br>
Finance: $${finance}<br>
Overage: $${overage}
`;
}

// ===== REPAIRS =====
function calcRepairs(){

let total =
(+document.getElementById("r1").value || 0) +
(+document.getElementById("r2").value || 0) +
(+document.getElementById("r3").value || 0) +
(+document.getElementById("r4").value || 0);

document.getElementById("repairOut").innerHTML = "Total: $" + total;
}

// ===== COGO =====
window.onload = function(){

let items = ["Roofing","Electrical","HVAC","Kitchen","Bathroom"];

let select = document.getElementById("cogoItem");

items.forEach(i=>{
let opt = document.createElement("option");
opt.text = i;
select.add(opt);
});

initSignature();
};

function addCogo(){

let item = document.getElementById("cogoItem").value;
let cost = +document.getElementById("cogoCost").value || 0;

cogoTotal += cost;

document.getElementById("cogoList").innerHTML += item + ": $" + cost + "<br>";
}

// ===== SIGNATURE =====
function initSignature(){

let canvas = document.getElementById("sig");
let ctx = canvas.getContext("2d");

canvas.width = 300;
canvas.height = 150;

ctx.lineWidth = 4;

let drawing = false;

canvas.addEventListener("touchstart", ()=> drawing = true);
canvas.addEventListener("touchend", ()=> drawing = false);

canvas.addEventListener("touchmove", e=>{
e.preventDefault();

if(!drawing) return;

let rect = canvas.getBoundingClientRect();
let t = e.touches[0];

ctx.lineTo(t.clientX - rect.left, t.clientY - rect.top);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(t.clientX - rect.left, t.clientY - rect.top);
});
}

function clearSig(){
let canvas = document.getElementById("sig");
canvas.getContext("2d").clearRect(0,0,300,150);
}

// ===== CONTRACT =====
function generateContract(){
alert("Contract Generated");
}

function brokerAgreement(){
alert("Broker Agreement Generated");
}

function preApp(){
alert("Pre App Generated");
}

function oneClickClose(){
alert("Deal Sent");
}

// ===== LINKS =====
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
