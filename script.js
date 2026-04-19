let dealData = {};
let cogoTotal = 0;

function openZillow(){
window.open("https://www.zillow.com/homes/" + encodeURIComponent(address.value));
}

function openRedfin(){
window.open("https://www.redfin.com/search?q=" + encodeURIComponent(address.value));
}

function openRural(){
window.open("https://eligibility.sc.egov.usda.gov/");
}

function analyzeDeal(){
let a = +arv.value;
let p = +price.value;
if(!a || !p) return alert("Enter numbers");

let overage = a - p;
let profit = (a * 0.7) - p;
let label = profit > 50000 ? "🔥 SOLID DEAL" : "⚠️ CHECK DEAL";

dealResult.innerHTML = `
<h3>💰 Deal Analysis</h3>
ARV: $${a.toLocaleString()}<br><br>
Price: $${p.toLocaleString()}<br><br>
Overage: $${overage.toLocaleString()}<br>
Profit: $${profit.toLocaleString()}<br><br>
<b>${label}</b>`;
}
