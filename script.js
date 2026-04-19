}let dealData = {};
let cogoRunningTotal = 0;

let cogoItems = [
"Roofing",
"Electrical",
"Plumbing",
"HVAC",
"Kitchen",
"Bathroom",
"Flooring",
"Windows",
"Foundation",
"Framing",
"Drywall",
"Paint",
"Demolition",
"Landscaping",
"Driveway",
"Garage",
"Laundry Room"
];

window.onload = function(){
const select = document.getElementById("cogoItem");
if(select){
cogoItems.forEach(item => {
let opt = document.createElement("option");
opt.text = item;
select.add(opt);
});
}
initSignature();
};

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

let overage = a - p;
let profit = (a * 0.7) - p;

dealData = { a, p, overage, profit };
}

function calcRepairs(){
let total = (+r1.value||0)+(+r2.value||0)+(+r3.value||0)+(+r4.value||0);
repairOut.innerHTML = "Total Rehab: $" + total.toLocaleString();
}

function addCogo(){
let item = cogoItem.value;
let cost = +cogoCost.value || 0;

cogoRunningTotal += cost;

let row = document.createElement("div");
row.innerHTML = `${item}: $${cost.toLocaleString()}`;
cogoList.appendChild(row);

cogoTotal.innerHTML = `<b>Total: $${cogoRunningTotal.toLocaleString()}</b>`;
}

function generatePDF(){
const { jsPDF } = window.jspdf;
const doc = new jsPDF();
doc.text("RO'Lyfe Holdings LLC", 10, 10);
doc.text("Deal Summary", 10, 20);
doc.save("Deal.pdf");
}
