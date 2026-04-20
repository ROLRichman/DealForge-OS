let dealData = {};
let runningCogoTotal = 0;

/* =========================
PROPERTY LINKS
========================= */

function openZillow() {
  const a = document.getElementById("address").value;
  window.open(
    "https://www.zillow.com/homes/" + encodeURIComponent(a),
    "_blank"
  );
}

function openRedfin() {
  const a = document.getElementById("address").value;
  window.open(
    "https://www.redfin.com/search?q=" + encodeURIComponent(a),
    "_blank"
  );
}

function openRural() {
  window.open(
    "https://eligibility.sc.egov.usda.gov/eligibility/welcomeAction.do?pageAction=sfp",
    "_blank"
  );
}

/* =========================
FORMAT MONEY
========================= */

function money(num) {
  return Number(num).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

/* =========================
DEAL ANALYSIS
========================= */

function analyzeDeal() {
  const arv = Number(
    document.getElementById("arv").value.replace(/,/g, "")
  );

  const price = Number(
    document.getElementById("price").value.replace(/,/g, "")
  );

  if (!arv || !price) {
    alert("Enter ARV + Purchase Price");
    return;
  }

  const overage = arv - price;
  const profit = (arv * 0.7) - price;

  let status = "⚠️ CHECK DEAL";

  if (profit >= 50000) {
    status = "👍🏾 GREAT DEAL — SOLID! CLOSE IT.";
  }

  dealData = {
    arv,
    price,
    overage,
    profit
  };

  document.getElementById("dealResult").innerHTML = `
    <h3>💰 Deal Analysis</h3>

    <p><strong>ARV:</strong> $${money(arv)}</p>
    <p><strong>Purchase:</strong> $${money(price)}</p>
    <p><strong>Overage:</strong> $${money(overage)}</p>
    <p><strong>Profit:</strong> $${money(profit)}</p>

    <div class="deal-status">
      ${status}
    </div>
  `;
}

function resetDeal() {
  location.reload();
}

/* =========================
3 TIER ENGINE
========================= */

function run3Tier() {
  const arv = Number(
    document.getElementById("tierArv").value.replace(/,/g, "")
  );

  if (!arv) return;

  const cash = arv * 0.50;
  const carry = arv * 0.65;
  const finance = arv * 0.75;

  const down = carry * 0.05;
  const mortgage = carry - down;

  document.getElementById("tierResults").innerHTML = `
    <h4>All Cash Offer</h4>
    <p>$${money(cash)}</p>

    <h4>Seller Carry</h4>
    <p>$${money(carry)}</p>
    <p>
      Buyer pays $${money(down)} down.<br>
      Seller carries first mortgage of
      $${money(mortgage)}.
    </p>

    <h4>Seller Financing</h4>
    <p>$${money(finance)}</p>
    <p>
      Strong exit strategy for wholesale,
      refinance, or hold.
    </p>
  `;
}

/* =========================
QUICK REPAIRS
========================= */

function calcRepairs() {
  const total =
    (+document.getElementById("r1").value || 0) +
    (+document.getElementById("r2").value || 0) +
    (+document.getElementById("r3").value || 0) +
    (+document.getElementById("r4").value || 0);

  document.getElementById("repairOut").innerHTML = `
    <h4>Total Rehab: $${money(total)}</h4>
  `;
}

/* =========================
COGO REPAIRS
========================= */

const cogoItems = [
  "Roofing",
  "Demolition",
  "Flooring",
  "Bathroom",
  "Landscaping",
  "Kitchen",
  "Garage",
  "HVAC",
  "Electrical",
  "Plumbing",
  "Windows",
  "Foundation"
];

function addCogo() {
  const item = document.getElementById("cogoItem").value;
  const cost =
    Number(document.getElementById("cogoCost").value) || 0;

  runningCogoTotal += cost;

  const div = document.createElement("div");
  div.innerHTML = `${item}: $${money(cost)}`;

  document.getElementById("cogoList").appendChild(div);

  document.getElementById("cogoTotal").innerHTML = `
    <h4>Total: $${money(runningCogoTotal)}</h4>
  `;
}

/* =========================
SIGNATURE FIXED
========================= */

function initSignature() {
  const canvas = document.getElementById("sig");
  const ctx = canvas.getContext("2d");

  canvas.width = canvas.offsetWidth;
  canvas.height = 180;

  ctx.lineWidth = 2;
  ctx.strokeStyle = "#111";

  let drawing = false;

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();

    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  function start(e) {
    e.preventDefault();
    drawing = true;

    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }

  function draw(e) {
    if (!drawing) return;

    e.preventDefault();

    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  function stop() {
    drawing = false;
    ctx.beginPath();
  }

  canvas.addEventListener("mousedown", start);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stop);

  canvas.addEventListener("touchstart", start, {
    passive: false
  });

  canvas.addEventListener("touchmove", draw, {
    passive: false
  });

  canvas.addEventListener("touchend", stop);
}

function clearSig() {
  const canvas = document.getElementById("sig");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/* =========================
PDF GENERATOR
========================= */

function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const address =
    document.getElementById("address").value || "";

  const closing =
    document.getElementById("closingDate").value || "";

  const sig =
    document.getElementById("sig").toDataURL("image/png");

  doc.setFontSize(12);

  doc.text("PURCHASE AND SALE AGREEMENT", 10, 10);

  doc.text(`Property: ${address}`, 10, 20);
  doc.text(`Closing Date: ${closing}`, 10, 30);

  doc.text(`ARV: $${money(dealData.arv || 0)}`, 10, 40);
  doc.text(`Purchase: $${money(dealData.price || 0)}`, 10, 50);

  doc.text("14 Day Inspection Period", 10, 65);
  doc.text("Assignable Contract", 10, 75);
  doc.text("Property Sold AS-IS", 10, 85);
  doc.text("Marketing Rights Included", 10, 95);
  doc.text("Buyer: Root Of Lyfe Holdings LLC", 10, 105);

  doc.text("Signature:", 10, 120);
  doc.addImage(sig, "PNG", 10, 125, 80, 30);

  doc.save("DealForgeOS.pdf");
}

/* =========================
EMAIL / TEXT
========================= */

function sendEmail() {
  window.open(
    "mailto:richman@rootoflyfe.com?subject=Deal Ready&body=Deal package ready for review.",
    "_blank"
  );
}

function sendText() {
  window.open(
    "sms:?body=Deal package ready for review.",
    "_blank"
  );
}

function oneClickClose() {
  generatePDF();
  sendEmail();
  sendText();

  alert("🚀 Deal Sent + PDF Generated");
}

/* =========================
LOAD
========================= */

window.onload = function () {
  const select = document.getElementById("cogoItem");

  cogoItems.forEach((item) => {
    const option = document.createElement("option");
    option.value = item;
    option.text = item;
    select.add(option);
  });

  initSignature();
};
