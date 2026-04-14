let resultsText = "";

// DEAL ANALYSIS
function analyzeDeal() {

let arv = +arvEl().value;
let price = +priceEl().value;
let rehab = +rehabEl().value;
let fee = +feeEl().value;
let months = +monthsEl().value;

let mao = (arv * 0.65) - rehab;
let cash = mao - fee;
let seller = mao + 10000;
let refi = (arv * 0.7) - rehab;

let holding = months * 2000;
let profit = arv - (price + rehab + fee + holding);

resultsText = `ARV: ${arv} | Profit: ${profit}`;

document.getElementById("results").innerHTML =
`<p>MAO: $${mao}</p>
<p>Cash: $${cash}</p>
<p>Profit: $${profit}</p>`;
}

// HELPERS
const arvEl = () => document.getElementById("arv");
const priceEl = () => document.getElementById("price");
const rehabEl = () => document.getElementById("rehab");
const feeEl = () => document.getElementById("fee");
const monthsEl = () => document.getElementById("months");

// PDF REPORT
function downloadPDF() {
const { jsPDF } = window.jspdf;
let doc = new jsPDF();
doc.text(resultsText, 10, 10);
doc.save("Deal.pdf");
}

// PDF AUTO-FILL
async function fillPDF(type) {

const { PDFDocument } = PDFLib;

let file = `docs/${type === "purchase" ? "purchase-agreement.pdf" :
type === "assignment" ? "assignment-contract.pdf" :
"realtor-offer.pdf"}`;

let pdfBytes = await fetch(file).then(r => r.arrayBuffer());

let pdfDoc = await PDFDocument.load(pdfBytes);
let page = pdfDoc.getPages()[0];

page.drawText(`Price: $${priceEl().value}`, { x:50, y:700 });
page.drawText(`ARV: $${arvEl().value}`, { x:50, y:680 });

let newPdf = await pdfDoc.save();

let blob = new Blob([newPdf], { type: "application/pdf" });
let link = document.createElement("a");
link.href = URL.createObjectURL(blob);
link.download = `${type}-filled.pdf`;
link.click();
}

// SIGNATURE PAD
let canvas = document.getElementById("sigPad");
let ctx = canvas.getContext("2d");
let drawing = false;

canvas.onmousedown = () => drawing = true;
canvas.onmouseup = () => drawing = false;

canvas.onmousemove = e => {
if (!drawing) return;
ctx.fillRect(e.offsetX, e.offsetY, 2, 2);
};

function clearSig() {
ctx.clearRect(0,0,canvas.width,canvas.height);
}

// SEND DEAL
function sendDeal() {

let email = document.getElementById("email").value;

let body = encodeURIComponent(`
Deal Ready

ARV: ${arvEl().value}
Price: ${priceEl().value}
`);

window.location.href = `mailto:${email}?subject=Deal Ready&body=${body}`;
              }
