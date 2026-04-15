let deal = {};
let inspectionTotal = 0;

// DEAL
function runDeal(){

let arv = +val("arv");
let price = +val("price");

let cash = Math.round(arv * 0.50);
let seller = Math.round(arv * 0.65);
let finance = Math.round(arv * 0.75);

let down = Math.round(seller * 0.05);
let monthly = Math.round((seller * 0.05)/12);

let overage = arv - price;

deal = {arv, price, cash, seller, finance};

id("offers").innerHTML = `
<b>Cash:</b> $${cash}<br><br>

<b>Seller Carry:</b> $${seller}<br>
Down: $${down}<br>
Monthly: $${monthly}<br><br>

<b>Seller Finance:</b> $${finance}<br><br>

<b>Overage:</b> $${overage} ${overage > 50000 ? "🔥 IT'S A DEAL!" : ""}
<br><br>

<small>
Cash = quick assignment<br>
Seller = small down, profit spread<br>
Finance = long-term cashflow play
</small>
`;

}

// QUICK REPAIR
function calcQuick(){
let total =
(+val("roof")||0)+
(+val("floor")||0)+
(+val("electrical")||0)+
(+val("plumbing")||0);

id("quickOut").innerHTML = "Total Rehab: $" + total;
}

// INSPECTION
function addInspection(){
let name = val("inspection");
let cost = +val("inspectCost");

inspectionTotal += cost;

id("inspectionList").innerHTML += `${name}: $${cost}<br>`;
id("inspectionTotal").innerHTML = "Total: $" + inspectionTotal;
}

// SEARCH
function openZillow(){
let addr = encodeURIComponent(val("address"));
window.open(`https://www.zillow.com/homes/${addr}`);
}
function openRedfin(){
let addr = encodeURIComponent(val("address"));
window.open(`https://www.redfin.com/search?q=${addr}`);
}

// SIGNATURE FIX
let canvas = document.getElementById("sigPad");
let ctx = canvas.getContext("2d");

let drawing=false;

canvas.addEventListener("touchstart",()=>{
drawing=true;
ctx.beginPath();
});

canvas.addEventListener("touchmove",e=>{
if(!drawing) return;

let rect=canvas.getBoundingClientRect();
let x=e.touches[0].clientX-rect.left;
let y=e.touches[0].clientY-rect.top;

ctx.lineWidth=3;
ctx.lineCap="round";

ctx.lineTo(x,y);
ctx.stroke();
});

canvas.addEventListener("touchend",()=>drawing=false);

function clearSig(){
ctx.clearRect(0,0,canvas.width,canvas.height);
}

// PDF
function downloadPDF(){
const { jsPDF } = window.jspdf;
const doc = new jsPDF();

doc.text("Deal Report",20,20);
doc.text(`Address: ${val("address")}`,20,30);
doc.text(`Cash: ${deal.cash}`,20,50);

let img = canvas.toDataURL();
doc.addImage(img,"PNG",20,90,120,40);

doc.save("deal.pdf");
}

// CONTRACT
function generateContract(){
let text = `
PURCHASE AGREEMENT

Buyer: Root Of Lyfe Holdings LLC

Address: ${val("address")}

Offer: $${deal.cash}

Assignment allowed.
Inspection period: 10 days.
Exit clause included.
Marketing rights included.
Double close allowed.
`;

download(text,"contract.txt");
}

// SEND
function sendOffer(){
window.open(`mailto:richman@rootoflyfe.com`);
}

// HELPERS
function val(id){return document.getElementById(id).value}
function id(id){return document.getElementById(id)}

function download(text,name){
let blob=new Blob([text]);
let a=document.createElement("a");
a.href=URL.createObjectURL(blob);
a.download=name;
a.click();
}
