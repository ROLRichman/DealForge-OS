let dealData = {};
let cogoTotal = 0;

// LINKS
function openZillow(){
window.open("https://www.zillow.com/homes/" + encodeURIComponent(address.value));
}
function openRedfin(){
window.open("https://www.redfin.com/search?q=" + encodeURIComponent(address.value));
}
function openRural(){
window.open("https://eligibility.sc.egov.usda.gov/");
}

// RESET
function resetDeal(){
address.value = "";
arv.value = "";
price.value = "";
closingDate.value = "";

dealResult.innerHTML = "";
tierResults.innerHTML = "";
repairOut.innerHTML = "";
cogoList.innerHTML = "";

dealData = {};
cogoTotal = 0;

clearSig();
}

// ANALYZE DEAL
function analyzeDeal(){
let a = +arv.value;
let p = +price.value;

if(!a || !p) return alert("Enter numbers");

let overage = a - p;
let profit = (a * 0.7) - p;

let label = profit > 50000 ? "🔥 SOLID DEAL" : "⚠️ CHECK DEAL";

dealData = {arv:a, price:p, overage, profit};

dealResult.innerHTML = `
<h3>💰 Deal Analysis</h3>
ARV: $${a.toLocaleString()}<br><br>
Price: $${p.toLocaleString()}<br><br>
Overage: $${overage.toLocaleString()}<br>
Profit: $${profit.toLocaleString()}<br><br>
<b>${label}</b>
`;
}

// 3 TIER
function run3Tier(){
let a = +tierArv.value;

let cash = a * 0.5;
let seller = a * 0.65;
let finance = a * 0.75;

tierResults.innerHTML = `
<br>
Cash Offer: $${cash.toLocaleString()}<br><br>
Seller Carry: $${seller.toLocaleString()}<br><br>
Seller Finance: $${finance.toLocaleString()}
`;
}

// REPAIRS
function calcRepairs(){
let total = (+r1.value||0)+(+r2.value||0)+(+r3.value||0)+(+r4.value||0);
repairOut.innerHTML = "Total Rehab: $" + total.toLocaleString();
}

// COGO LIST
let cogoItems = [
"Roofing","Electrical","Plumbing","HVAC","Kitchen","Bathroom",
"Flooring","Windows","Foundation","Framing","Drywall","Paint",
"Demolition","Landscaping","Driveway","Garage","Laundry Room"
];

window.onload = function(){
cogoItems.forEach(i=>{
let opt = document.createElement("option");
opt.text = i;
cogoItem.add(opt);
});
initSignature();
};

function addCogo(){
let item = cogoItem.value;
let cost = +cogoCost.value || 0;

cogoTotal += cost;

cogoList.innerHTML =
"<b>Total: $" + cogoTotal.toLocaleString() + "</b><br>" +
item + ": $" + cost + "<br>" +
cogoList.innerHTML;
}

// SIGNATURE
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

// PDF (WITH CLAUSES)
function generatePDF(){
const { jsPDF } = window.jspdf;
let doc = new jsPDF();

let y = 10;

doc.text("RO’Lyfe Holdings LLC - Deal Summary",10,y); y+=10;
doc.text("Property: " + address.value,10,y); y+=6;
doc.text("ARV: $" + dealData.arv,10,y); y+=6;
doc.text("Price: $" + dealData.price,10,y); y+=6;
doc.text("Overage: $" + dealData.overage,10,y); y+=6;
doc.text("Closing: " + closingDate.value,10,y); y+=10;

doc.text("TERMS:",10,y); y+=6;
doc.text("- AS-IS Sale",10,y); y+=5;
doc.text("- Assignable Contract",10,y); y+=5;
doc.text("- 14 Day Inspection",10,y); y+=5;
doc.text("- Non-Circumvention",10,y); y+=10;

doc.text("Buyer:",10,y); y+=6;
doc.text("Richardson L.",10,y); y+=6;

doc.save("Deal.pdf");
}

// EMAIL
function sendEmail(){
let subject = encodeURIComponent("🔥 Deal Ready");

let body = encodeURIComponent(`
Property: ${address.value}

ARV: $${dealData.arv}
Price: $${dealData.price}
Overage: $${dealData.overage}

Richardson L.
267-808-5844
richman@rootoflyfe.com
`);

window.open(`mailto:?subject=${subject}&body=${body}`);
}

// SMS
function sendText(){
let msg = encodeURIComponent(`🔥 DEAL\n${address.value}\nCall 267-808-5844`);
window.open("sms:?body=" + msg);
}

// ONE CLICK CLOSE
function oneClickClose(){
generatePDF();
sendEmail();
sendText();
alert("🚀 Deal Sent");
  }
