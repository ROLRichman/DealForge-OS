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


// COGO LIST
let cogoItems = [
"Roofing","Electrical","Foundation","HVAC","Kitchen","Bathroom"
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


// ADD COGO ITEM
function addCogo(){
let item = document.getElementById("cogoItem").value;
let cost = +document.getElementById("cogoCost").value || 0;

cogoTotal += cost;

document.getElementById("cogoList").innerHTML +=
item + ": $" + cost + "<br>";

document.getElementById("cogoList").innerHTML +=
"<b>Total: $" + cogoTotal + "</b><br>";
}


// SIGNATURE FIX (MOBILE LOCK)
function initSignature(){
let canvas = document.getElementById("sig");
let ctx = canvas.getContext("2d");

canvas.width = 300;
canvas.height = 150;

ctx.lineWidth = 3;
ctx.lineCap = "round";

let drawing = false;

canvas.addEventListener("touchstart", e=>{
drawing = true;
});

canvas.addEventListener("touchend", e=>{
drawing = false;
});

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


// CLEAR SIGNATURE
function clearSig(){
let canvas = document.getElementById("sig");
let ctx = canvas.getContext("2d");
ctx.clearRect(0,0,canvas.width,canvas.height);
}


// SEND TEXT (YOUR BUSINESS LINE)
function sendText(){
let msg = encodeURIComponent("New Deal Ready - Contact Richardson @ 267-808-5844");
window.open("sms:?body=" + msg);
}
