let dealData = {};
let runningCogoTotal = 0;

function openZillow() {
  const address = document.getElementById("address").value;
  window.open("https://www.zillow.com/homes/" + encodeURIComponent(address), "_blank");
}

function openRedfin() {
  const address = document.getElementById("address").value;
  window.open("https://www.redfin.com/search?q=" + encodeURIComponent(address), "_blank");
}

function openRural() {
  window.open("https://eligibility.sc.egov.usda.gov/", "_blank");
}

function analyzeDeal() {
  const arv = Number(document.getElementById("arv").value.replace(/,/g, ""));
  const price = Number(document.getElementById("price").value.replace(/,/g, ""));

  if (!arv || !price) {
    alert("Enter ARV + Purchase Price");
    return;
  }

  const overage = arv - price;
  const profit = (arv * 0.7) - price;
  const label = profit > 50000 ? "🔥 SOLID DEAL" : "⚠️ CHECK DEAL";

  dealData = { arv, price, overage, profit };

  document.getElementById("dealResult").innerHTML = `
    <h3>💰 Deal Analysis</h3>
    ARV: $${arv.toLocaleString()}<br><br>
    Purchase: $${price.toLocaleString()}<br><br>
    Overage: $${overage.toLocaleString()}<br><br>
    Profit: $${profit.toLocaleString()}<br><br>
    <b>${label}</b>
  `;
}

function resetDeal() {
  location.reload();
}

function run3Tier() {
  const arv = Number(document.getElementById("tierArv").value.replace(/,/g, ""));
  if (!arv) return;

  document.getElementById("tierResults").innerHTML = `
    <br>
    Cash Offer: $${(arv * 0.5).toLocaleString()}<br><br>
    Seller Carry: $${(arv * 0.65).toLocaleString()}<br><br>
    Seller Finance: $${(arv * 0.75).toLocaleString()}
  `;
}

function calcRepairs() {
  const total =
    (+document.getElementById("r1").value || 0) +
    (+document.getElementById("r2").value || 0) +
    (+document.getElementById("r3").value || 0) +
    (+document.getElementById("r4").value || 0);

  document.getElementById("repairOut").innerHTML = `Total Rehab: $${total.toLocaleString()}`;
}

const cogoItems = [
  "Roofing", "Electrical", "Plumbing", "HVAC", "Kitchen",
  "Bathroom", "Flooring", "Windows", "Foundation", "Paint",
  "Demolition", "Landscaping"
];

window.onload = () => {
  const select = document.getElementById("cogoItem");
  cogoItems.forEach(item => {
    const option = document.createElement("option");
    option.text = item;
    option.value = item;
    select.add(option);
  });

  initSignature();
};

function addCogo() {
  const item = document.getElementById("cogoItem").value;
  const cost = +document.getElementById("cogoCost").value || 0;

  runningCogoTotal += cost;

  const div = document.createElement("div");
  div.innerHTML = `${item}: $${cost.toLocaleString()}`;
  document.getElementById("cogoList").appendChild(div);

  document.getElementById("cogoTotal").innerHTML = `<b>Total: $${runningCogoTotal.toLocaleString()}</b>`;
}

function initSignature() {
  const canvas = document.getElementById("sig");
  const ctx = canvas.getContext("2d");

  canvas.width = canvas.offsetWidth;
  canvas.height = 160;

  ctx.strokeStyle = "#111";
  ctx.lineWidth = 2;

  let drawing = false;

  canvas.addEventListener("mousedown", () => drawing = true);
  canvas.addEventListener("mouseup", () => {
    drawing = false;
    ctx.beginPath();
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  });
}

function clearSig() {
  const canvas = document.getElementById("sig");
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
}

function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text("RO'Lyfe Holdings LLC - Deal Summary", 10, 10);
  doc.text(`Property: ${document.getElementById("address").value}`, 10, 20);
  doc.text(`ARV: $${dealData.arv || 0}`, 10, 30);
  doc.text(`Purchase: $${dealData.price || 0}`, 10, 40);
  doc.text("14 Day Inspection", 10, 55);
  doc.text("Assignable Contract", 10, 65);
  doc.text("AS-IS Sale", 10, 75);
  doc.text("Buyer: Richardson L.", 10, 90);

  doc.save("DealForge.pdf");
}

function sendEmail() {
  window.open("mailto:richman@rootoflyfe.com?subject=Deal Ready", "_blank");
}

function sendText() {
  window.open("sms:?body=Deal Ready", "_blank");
}

function oneClickClose() {
  generatePDF();
  sendEmail();
  sendText();
  alert("🚀 Deal Sent");
                          }
