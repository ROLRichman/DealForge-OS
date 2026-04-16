let dealData = {};
let cogoTotal = 0;

// ================= ANALYZE =================
function analyzeDeal(){

let arv = +arvInput();
let price = +priceInput();

if(!arv || !price){ alert("Enter numbers"); return; }

let cash = arv * 0.5;
let seller = arv * 0.65;
let finance = arv * 0.75;
let overage = arv - price;
let profit = cash - price;

dealData = {arv, price, overage};

let label = profit > 20000 ? "🔥 SOLID DEAL" : "⚠️ CHECK NUMBERS";

results.innerHTML = `
<h3>💰 3 Tier</h3>
Cash: $${cash.toFixed(0)}<br>
Seller: $${seller.toFixed(0)}<br>
Finance: $${finance.toFixed(0)}<br><br>

(ADD PROFIT RESALE): $${profit.toFixed(0)}<br>
Overage: $${overage.toFixed(0)}<br><br>

<b>${label}</b>
`;
}

// ================= 3 TIER ENGINE =================
function runTier(){

let arv = +document.getElementById("tierArv").value;

let cash = arv * 0.5;
let seller = arv * 0.65;
let finance = arv * 0.75;

tierResults.innerHTML = `
Cash: $${cash.toFixed(0)}<br>
Seller Carry: $${seller.toFixed(0)}<br>
Seller Finance: $${finance.toFixed(0)}
`;
}

// ================= COGO FULL LIST =================
let cogoItems = [
"Roofing","Electrical","Plumbing","HVAC","Kitchen","Bathroom",
"Flooring","Windows","Foundation","Framing","Painting","Drywall",
"Demolition","Landscaping","Garage","Laundry Room","Basement",
"Siding","Insulation","Driveway","Deck","Porch","Gutters"
];

window.onload = ()=>{
cogoItems.forEach(i=>{
let opt = document.createElement("option");
opt.text = i;
cogoItem.add(opt);
});
initSig();
};

// ================= COGO ADD =================
function addCogo(){
let cost = +cogoCost.value || 0;
cogoTotal += cost;

cogoList.innerHTML =
`<b>Total: $${cogoTotal}</b><br>` +
cogoItem.value + ": $" + cost + "<br>" +
cogoList.innerHTML;
}

// ================= SIGNATURE (FIXED) =================
function initSig(){

let c = sig;
let ctx = c.getContext("2d");

let drawing = false;

c.addEventListener("touchstart", ()=> drawing = true);
c.addEventListener("touchend", ()=> drawing = false);

c.addEventListener("touchmove", e=>{
e.preventDefault();
if(!drawing) return;

let rect = c.getBoundingClientRect();
let t = e.touches[0];

ctx.lineTo(t.clientX - rect.left, t.clientY - rect.top);
ctx.stroke();
ctx.beginPath();
});
}

function clearSig(){
sig.getContext("2d").clearRect(0,0,sig.width,sig.height);
}

// ================= PDF =================
function generateContract(){
const { jsPDF } = window.jspdf;
let doc = new jsPDF();

doc.text("RO'LYFE DEAL",10,10);
doc.text("Address: "+address.value,10,20);
doc.text("ARV: $"+dealData.arv,10,30);

doc.save("deal.pdf");
}

// ================= EMAIL =================
function sendEmail(){
window.open(`mailto:?subject=Deal&body=${address.value}`);
}

// ================= SMS =================
function sendText(){
window.open("sms:?body="+address.value);
}

// ================= ONE CLICK =================
function oneClickClose(){
generateContract();
sendEmail();
sendText();
alert("🚀 Deal Sent");
}

// HELPERS
function arvInput(){ return document.getElementById("arv").value; }
function priceInput(){ return document.getElementById("price").value; }

// LINKS
function openZillow(){ window.open("https://zillow.com"); }
function openRedfin(){ window.open("https://redfin.com"); }
function openRural(){ window.open("https://eligibility.sc.egov.usda.gov/"); }
