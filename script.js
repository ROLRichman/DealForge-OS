let dealData = {};

// ================= LINKS =================
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

// ================= ANALYZE DEAL =================
function analyzeDeal(){

let arv = +document.getElementById("arv").value;
let price = +document.getElementById("price").value;

if(!arv || !price){
alert("Enter ARV & Price");
return;
}

// CORE CALCS
let cash = arv * 0.5;
let seller = arv * 0.65;
let finance = arv * 0.75;

let down = seller * 0.05;
let monthly = (seller - down) * 0.006;
let monthly2 = finance * 0.005;

let overage = arv - price;

// SAVE GLOBAL
dealData = {arv, price, cash, seller, finance, down, monthly, monthly2, overage};

// DISPLAY
document.getElementById("results").innerHTML = `
<h3>💰 3 Tier Offers</h3>

<b>Cash Offer:</b> $${cash.toFixed(0)}<br>
<b>Seller Carry:</b> $${seller.toFixed(0)}<br>
Down: $${down.toFixed(0)}<br>
Monthly: $${monthly.toFixed(0)}<br><br>

<b>Seller Finance:</b> $${finance.toFixed(0)}<br>
Monthly: $${monthly2.toFixed(0)}<br><br>

<b>Overage:</b> $${overage.toFixed(0)}<br>
🔥 DEAL STATUS: LIVE
`;

advanced3Tier();
}

// ================= ADVANCED TERMS =================
function advanced3Tier(){

let {seller, finance} = dealData;

// SELLER CARRY
let loan = seller * 0.95;
let rate = 0.05/12;
let monthly = loan * rate / (1 - Math.pow(1+rate,-360));
let balloon = loan * Math.pow(1+rate,48);

// SELLER FINANCE
let rate2 = 0.06/12;
let monthly2 = finance * rate2 / (1 - Math.pow(1+rate2,-360));
let balloon2 = finance * Math.pow(1+rate2,60);

document.getElementById("results").innerHTML += `
<hr>
<h3>📊 Advanced Terms</h3>

Seller Carry:<br>
Monthly: $${monthly.toFixed(0)}<br>
Balloon (4yr): $${balloon.toFixed(0)}<br><br>

Seller Finance:<br>
Monthly: $${monthly2.toFixed(0)}<br>
Balloon (5yr): $${balloon2.toFixed(0)}
`;
}

// ================= EMAIL =================
function sendEmail(){

if(!dealData.arv){
alert("Run deal first");
return;
}

let subject = encodeURIComponent("New Deal - " + document.getElementById("address").value);

let body = encodeURIComponent(`
Address: ${document.getElementById("address").value}

ARV: $${dealData.arv}
Price: $${dealData.price}
Overage: $${dealData.overage}

Contact:
Richardson L.
267-808-5844
richman@rootoflyfe.com
`);

window.open(`mailto:?subject=${subject}&body=${body}`);
}

// ================= SMS =================
function sendText(){

if(!dealData.arv){
alert("Run deal first");
return;
}

let msg = encodeURIComponent(`
🔥 NEW DEAL

${document.getElementById("address").value}

ARV: $${dealData.arv}
Price: $${dealData.price}

📞 267-808-5844
`);

window.open("sms:?body=" + msg);
}

// ================= REPAIRS =================
function calcRepairs(){

let total =
(+r1.value||0)+(+r2.value||0)+(+r3.value||0)+(+r4.value||0);

repairOut.innerHTML = "Total Rehab: $" + total;
}

// ================= COGO =================
let cogoTotal = 0;

function addCogo(){

let item = cogoItem.value;
let cost = +cogoCost.value || 0;

cogoTotal += cost;

cogoList.innerHTML =
`<b>Total: $${cogoTotal}</b><br>` +
item + ": $" + cost + "<br>" +
cogoList.innerHTML;
}

// ================= PDF =================
function generateContract(){
const { jsPDF } = window.jspdf;
let doc = new jsPDF();

doc.text("RO'LYFE PURCHASE AGREEMENT",10,10);
doc.text("Price: $" + dealData.price,10,20);
doc.text("ARV: $" + dealData.arv,10,30);

doc.save("deal.pdf");
}

// ================= ONE CLICK =================
function oneClickClose(){

generateContract();
sendEmail();
sendText();

alert("🚀 Deal Sent + Contract Generated");
}
