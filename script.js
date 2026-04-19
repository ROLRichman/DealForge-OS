let dealData = {};
let runningCogoTotal = 0;

function openZillow(){
const a = document.getElementById("address").value;
window.open("https://www.zillow.com/homes/" + encodeURIComponent(a));
}

function openRedfin(){
const a = document.getElementById("address").value;
window.open("https://www.redfin.com/search?q=" + encodeURIComponent(a));
}

function openRural(){
window.open("https://eligibility.sc.egov.usda.gov/");
}

function analyzeDeal(){
const arv = Number(document.getElementById("arv").value.replace(/,/g,""));
const price = Number(document.getElementById("price").value.replace(/,/g,""));

const overage = arv - price;
const profit = (arv * 0.7) - price;

dealData = {arv, price, overage, profit};

document.getElementById("dealResult").innerHTML =
`
<h3>💰 Deal Analysis</h3>
ARV: $${arv}<br>
Purchase: $${price}<br>
Overage: $${overage}<br>
Profit: $${profit}
`;
}

function resetDeal(){ location.reload(); }

function run3Tier(){
const a = Number(document.getElementById("tierArv").value);

document.getElementById("tierResults").innerHTML =
`
Cash: $${a*0.5}<br>
Seller Carry: $${a*0.65}<br>
Finance: $${a*0.75}
`;
}

function calcRepairs(){
const total =
(+r1.value||0)+(+r2.value||0)+(+r3.value||0)+(+r4.value||0);

document.getElementById("repairOut").innerText =
"Total: $" + total;
}

/* ✍️ FIXED SIGNATURE (MOBILE + DESKTOP) */
function initSignature(){
const canvas = document.getElementById("sig");
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = 180;

let drawing = false;

function pos(e){
const r = canvas.getBoundingClientRect();
return {
x:(e.touches?e.touches[0].clientX:e.clientX)-r.left,
y:(e.touches?e.touches[0].clientY:e.clientY)-r.top
};
}

function start(e){ drawing=true; ctx.beginPath(); ctx.moveTo(...Object.values(pos(e))); }
function draw(e){
if(!drawing) return;
const p = pos(e);
ctx.lineTo(p.x,p.y);
ctx.stroke();
}

function end(){ drawing=false; }

canvas.addEventListener("mousedown",start);
canvas.addEventListener("mousemove",draw);
canvas.addEventListener("mouseup",end);

canvas.addEventListener("touchstart",start);
canvas.addEventListener("touchmove",draw);
canvas.addEventListener("touchend",end);
}

function clearSig(){
const c=document.getElementById("sig");
c.getContext("2d").clearRect(0,0,c.width,c.height);
}

/* 🧾 PDF NOW INCLUDES SIGNATURE */
function generatePDF(){
const {jsPDF}=window.jspdf;
const doc=new jsPDF();

const sig=document.getElementById("sig").toDataURL("image/png");

doc.text("DealForge OS Summary",10,10);
doc.text(`ARV: ${dealData.arv}`,10,20);
doc.text(`Price: ${dealData.price}`,10,30);
doc.text(`Profit: ${dealData.profit}`,10,40);

doc.text("Signature:",10,60);
doc.addImage(sig,"PNG",10,65,80,30);

doc.save("DealForge.pdf");
}

function sendEmail(){
window.open("mailto:richman@rootoflyfe.com?subject=Deal Ready");
}

function sendText(){
window.open("sms:?body=Deal Ready");
}

function oneClickClose(){
generatePDF();
sendEmail();
sendText();
alert("Deal Sent 🚀");
}

window.onload=initSignature;
