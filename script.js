let dealData = {};

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

// ANALYZE
function analyzeDeal(){

let arv = +arvInput();
let price = +priceInput();

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

dealData = {arv, price, overage};

results.innerHTML = `
<h3>💰 3 Tier</h3>

Cash: $${cash.toFixed(0)}<br>
Seller: $${seller.toFixed(0)}<br>
Finance: $${finance.toFixed(0)}<br>

Overage: $${overage.toFixed(0)}
`;
}

// HELPERS
function arvInput(){ return document.getElementById("arv").value; }
function priceInput(){ return document.getElementById("price").value; }

// EMAIL
function sendEmail(){

if(!dealData.arv){ alert("Run deal first"); return; }

let body = encodeURIComponent(`
${address.value}

ARV: $${dealData.arv}
Price: $${dealData.price}

267-808-5844
richman@rootoflyfe.com
`);

window.open(`mailto:?body=${body}`);
}

// SMS
function sendText(){

if(!dealData.arv){ alert("Run deal first"); return; }

let msg = encodeURIComponent(`${address.value} ARV:${dealData.arv}`);

window.open("sms:?body=" + msg);
}

// REPAIRS
function calcRepairs(){
let total = (+r1.value||0)+(+r2.value||0)+(+r3.value||0)+(+r4.value||0);
repairOut.innerHTML = "Total Rehab: $" + total;
}

// COGO
let cogoTotal = 0;

function addCogo(){
let cost = +cogoCost.value || 0;
cogoTotal += cost;
cogoList.innerHTML = "Total: $" + cogoTotal;
}

// SIGNATURE
function clearSig(){
sig.getContext("2d").clearRect(0,0,sig.width,sig.height);
}

// PDF
function generateContract(){
const { jsPDF } = window.jspdf;
let doc = new jsPDF();

doc.text("Deal Summary",10,10);
doc.text(address.value,10,20);

doc.save("deal.pdf");
}

// ONE CLICK
function oneClickClose(){
generateContract();
sendEmail();
sendText();
alert("Deal Sent");
}
