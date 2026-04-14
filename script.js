let resultsText = "";

// DEAL
function analyzeDeal() {

let arv = +val("arv");
let price = +val("price");
let rehab = +val("rehab");
let fee = +val("fee");
let months = +val("months");

let mao = (arv * 0.65) - rehab;
let cash = mao - fee;
let holding = months * 2000;
let profit = arv - (price + rehab + fee + holding);

resultsText = `
ARV: ${arv}
Purchase: ${price}
Rehab: ${rehab}
MAO: ${mao}
Cash Offer: ${cash}
Profit: ${profit}
`;

id("results").innerHTML = `
<b>MAO:</b> $${mao}<br>
<b>Cash Offer:</b> $${cash}<br>
<b>Profit:</b> $${profit}<br>
`;
}

// HELPERS
function val(idName){ return document.getElementById(idName).value }
function id(idName){ return document.getElementById(idName) }

// REPAIRS
function calcRepairs() {
let total =
+val("roof") +
+val("hvac") +
+val("paint") +
+val("flooring") +
+val("plumbing") +
+val("other");

id("repairsOut").innerHTML = "Total Rehab: $" + total;
}

// PDF REPORT (FIXED SPACING)
function downloadPDF() {

const { jsPDF } = window.jspdf;
let doc = new jsPDF();

doc.setFontSize(18);
doc.text("Deal Report", 20, 20);

doc.setFontSize(12);

let y = 40;
resultsText.split("\n").forEach(line => {
doc.text(line, 20, y);
y += 10;
});

doc.save("Deal.pdf");
}

// AUTO FILL PDF (CENTERED TEXT)
async function fillPDF(type) {

const { PDFDocument } = PDFLib;

let file = `docs/${type === "purchase" ? "purchase-agreement.pdf" :
type === "assignment" ? "assignment-contract.pdf" :
"realtor-offer.pdf"}`;

let bytes = await fetch(file).then(r => r.arrayBuffer());

let pdf = await PDFDocument.load(bytes);
let page = pdf.getPages()[0];

let width = page.getWidth();

page.drawText(`Price: $${val("price")}`, { x: width/3, y: 600, size: 12 });
page.drawText(`ARV: $${val("arv")}`, { x: width/3, y: 580, size: 12 });

let saved = await pdf.save();

let blob = new Blob([saved], { type: "application/pdf" });
let link = document.createElement("a");

link.href = URL.createObjectURL(blob);
link.download = `${type}-filled.pdf`;
link.click();
}

// SIGNATURE FIXED (WORKING MOBILE)
let canvas = document.getElementById("sigPad");
let ctx = canvas.getContext("2d");

let drawing = false;

canvas.addEventListener("touchstart", () => drawing = true);
canvas.addEventListener("touchend", () => drawing = false);

canvas.addEventListener("touchmove", e => {
if (!drawing) return;
let rect = canvas.getBoundingClientRect();
let x = e.touches[0].clientX - rect.left;
let y = e.touches[0].clientY - rect.top;
ctx.fillRect(x,y,2,2);
});

function clearSig(){
ctx.clearRect(0,0,canvas.width,canvas.height);
}

// SEND
function sendDeal(){

let email = val("email");

let body = encodeURIComponent(resultsText);

window.location.href =
`mailto:${email}?subject=Deal Ready&body=${body}`;
}

// ZILLOW
function openZillow(){
let addr = val("address");
window.open("https://www.zillow.com/homes/" + encodeURIComponent(addr));
}
