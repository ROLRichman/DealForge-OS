let cogoTotal = 0;

// INIT
window.onload = () => {
initSignature();
loadCogo();
};

// ================= DEAL =================
function analyzeDeal(){

let arv = Number(arvInput("arv"));
let price = Number(arvInput("price"));

let cash = arv * 0.5;
let seller = arv * 0.65;
let finance = arv * 0.75;

let down = seller * 0.05;
let monthly = (seller - down) * 0.05 / 12;
let financeMonthly = finance * 0.06 / 12;

let overage = arv - price;

document.getElementById("results").innerHTML = `
<h3>💰 3 Tier Offers</h3>

Cash: $${cash.toFixed(0)}<br>
Seller Carry: $${seller.toFixed(0)}<br>
Down: $${down.toFixed(0)}<br>
Monthly: $${monthly.toFixed(0)}<br><br>

Seller Finance: $${finance.toFixed(0)}<br>
Monthly: $${financeMonthly.toFixed(0)}<br><br>

Overage: $${overage.toFixed(0)}<br>
<b>🔥 IT'S A DEAL!</b><br><br>

Cash = quick assignment<br>
Seller = small down<br>
Finance = long-term cashflow
`;
}

function arvInput(id){
return document.getElementById(id).value || 0;
}

// ================= REPAIRS =================
function calcRepairs(){

let total =
Number(r1.value||0) +
Number(r2.value||0) +
Number(r3.value||0) +
Number(r4.value||0);

document.getElementById("repairsOut").innerHTML =
"Total Rehab: $" + total.toFixed(0);
}

// ================= COGO =================
const cogoItems = [
"Roofing","Electrical","Plumbing","HVAC","Kitchen","Bathroom",
"Flooring","Foundation","Windows","Doors","Drywall","Painting"
];

function loadCogo(){
let select = document.getElementById("cogoItem");

cogoItems.forEach(i=>{
let opt = document.createElement("option");
opt.value = i;
opt.text = i;
select.appendChild(opt);
});
}

function addCogo(){

let item = cogoItem.value;
let price = Number(cogoPrice.value||0);

cogoTotal += price;

let div = document.createElement("div");
div.innerHTML = `${item}: $${price}`;

cogoList.appendChild(div);

cogoTotalDisplay();
}

function cogoTotalDisplay(){
document.getElementById("cogoTotal").innerHTML =
"<b>Total: $" + cogoTotal.toFixed(0) + "</b>";
}

// ================= SIGNATURE =================
let canvas, ctx, drawing=false;

function initSignature(){

canvas = document.getElementById("sigPad");
ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = 150;

ctx.lineWidth = 3;
ctx.lineCap = "round";
ctx.strokeStyle = "black";

// TOUCH FIX (IMPORTANT)
canvas.addEventListener("touchstart", start);
canvas.addEventListener("touchend", stop);
canvas.addEventListener("touchmove", draw);

canvas.addEventListener("mousedown", start);
canvas.addEventListener("mouseup", stop);
canvas.addEventListener("mousemove", draw);
}

function start(e){
drawing = true;
ctx.beginPath();
}

function stop(){
drawing = false;
}

function draw(e){

if(!drawing) return;

let rect = canvas.getBoundingClientRect();

let x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
let y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;

ctx.lineTo(x,y);
ctx.stroke();
}

function clearSig(){
ctx.clearRect(0,0,canvas.width,canvas.height);
}

// ================= PDF =================
function downloadPDF(){

const { jsPDF } = window.jspdf;
const doc = new jsPDF();

doc.text("Deal Report",20,20);
doc.text(document.getElementById("results").innerText,20,40);

doc.save("Deal.pdf");
}

// ================= CONTRACT =================
function generateContract(){

let price = document.getElementById("price").value;

let text = `
PURCHASE AGREEMENT

Buyer: Root Of Lyfe Holdings LLC

Purchase Price: $${price}

Assignable Contract
Inspection Period Included
Exit Clause Protected
Marketing Rights Included
Double Close Allowed

`;

let blob = new Blob([text], {type:"text/plain"});
let link = document.createElement("a");

link.href = URL.createObjectURL(blob);
link.download = "Contract.txt";
link.click();
}

// ================= LINKS =================
function openZillow(){
let addr = document.getElementById("address").value;
window.open("https://www.zillow.com/homes/" + encodeURIComponent(addr));
}

function openRedfin(){
window.open("https://www.redfin.com/");
  }
