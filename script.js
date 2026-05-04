let dealData = {};
let runningCogoTotal = 0;

/* =========================
LINKS
========================= */

const JAMAL_LINK = "https://agent.jotform.com/019bdd1fe57172838101dccf3612b1e9e787";
const CONTRACT_HUB = "https://rolrichman.github.io/rolyfe-contract-documents-hub/";
const FUNDING_LINK = "https://workdrive.zohoexternal.com/file/g6vcbdaba9ad8d815404a873a060254fe1bfc";
const BUYER_NETWORK = "https://rolrichman.github.io/RO-Lyfe-Buyer-Network-OS/";

function openZillow() {
  const a = value("address");
  window.open("https://www.zillow.com/homes/" + encodeURIComponent(a), "_blank");
}

function openRedfin() {
  const a = value("address");
  window.open("https://www.redfin.com/search?q=" + encodeURIComponent(a), "_blank");
}

/* =========================
HELPERS
========================= */

function value(id) {
  return document.getElementById(id)?.value || "";
}

function num(id) {
  return Number((value(id) || "0").replace(/,/g, "")) || 0;
}

function money(n) {
  return "$" + Number(n || 0).toLocaleString("en-US", {
    maximumFractionDigits: 0
  });
}

function scoreLabel(score) {
  if (score >= 75) return "🟢 SNIPER";
  if (score >= 56) return "🟡 BUILD";
  if (score >= 31) return "⚪ NEUTRAL";
  return "🔴 PASS";
}

/* =========================
DEAL ANALYSIS
========================= */

function analyzeDeal() {
  const address = value("address");
  const arv = num("arv");
  const price = num("price");
  const repairs = num("repairs");
  const assignment = num("assignment");

  if (!arv || !price) {
    alert("Enter ARV and Purchase Price.");
    return;
  }

  const mao = (arv * 0.70) - repairs - assignment;
  const profit = mao - price;
  const totalProject = price + repairs + assignment;
  const equitySpread = arv - totalProject;
  const overage = arv - price;

  let label = "❌ PASS";
  if (profit >= 50000) label = "🔥 SOLID DEAL";
  else if (profit >= 10000) label = "⚠️ CHECK DEAL";

  let score = 0;
  const discountScore = ((arv - price) / arv) * 40;
  const equityScore = (equitySpread / arv) * 40;
  const repairRisk = Math.max(0, 20 - ((repairs / arv) * 50));
  score = Math.max(0, Math.min(100, Math.round(discountScore + equityScore + repairRisk)));

  dealData = {
    address,
    arv,
    price,
    repairs,
    assignment,
    mao,
    profit,
    totalProject,
    equitySpread,
    overage,
    label,
    score,
    status: "Analyzed",
    date: new Date().toLocaleString()
  };

  document.getElementById("dealResult").innerHTML = `
    <h3>💰 Deal Analysis</h3>
    <p><strong>Property:</strong> ${address || "Not entered"}</p>
    <p><strong>ARV:</strong> ${money(arv)}</p>
    <p><strong>Purchase:</strong> ${money(price)}</p>
    <p><strong>Repairs:</strong> ${money(repairs)}</p>
    <p><strong>Assignment Fee:</strong> ${money(assignment)}</p>
    <p><strong>MAO:</strong> ${money(mao)}</p>
    <p><strong>Profit vs MAO:</strong> ${money(profit)}</p>
    <p><strong>Total Project Cost:</strong> ${money(totalProject)}</p>
    <p><strong>Equity Spread:</strong> ${money(equitySpread)}</p>
    <p><strong>Sniper Score:</strong> ${score}/100 — ${scoreLabel(score)}</p>

    <div class="deal-status">${label}</div>

    <hr>

    <p><strong>Next Move:</strong><br>
    ${profit < 0
      ? "This deal does NOT work at asking price. Control it below MAO or pass."
      : "Structure offer, open contract hub, or send to funding."}
    </p>
  `;
}

/* =========================
3 TIER ENGINE
========================= */

function run3Tier() {
  const arv = num("tierArv") || num("arv");

  if (!arv) {
    alert("Enter ARV first.");
    return;
  }

  const cash = arv * 0.50;
  const carry = arv * 0.65;
  const finance = arv * 0.75;

  const carryDown = carry * 0.05;
  const carryBalance = carry - carryDown;

  const carryPayment = monthlyPayment(carryBalance, 0.05, 30);
  const carryBalloon = remainingBalance(carryBalance, 0.05, 30, 48);

  const financePayment = monthlyPayment(finance, 0.06, 30);
  const financeBalloon = remainingBalance(finance, 0.06, 30, 60);

  document.getElementById("tierResults").innerHTML = `
    <h4>All Cash Offer</h4>
    <p>${money(cash)}</p>

    <h4>Seller Carry</h4>
    <p>Purchase Price: ${money(carry)}</p>
    <p>Down Payment: ${money(carryDown)}</p>
    <p>Seller Carry Balance: ${money(carryBalance)}</p>
    <p>Monthly Payment: ${money(carryPayment)}</p>
    <p>4-Year Balloon: ${money(carryBalloon)}</p>

    <h4>Seller Financing</h4>
    <p>Purchase Price: ${money(finance)}</p>
    <p>Down Payment: $0</p>
    <p>Monthly Payment: ${money(financePayment)}</p>
    <p>5-Year Balloon: ${money(financeBalloon)}</p>
  `;
}

function monthlyPayment(principal, annualRate, years) {
  const r = annualRate / 12;
  const n = years * 12;
  return principal * r / (1 - Math.pow(1 + r, -n));
}

function remainingBalance(principal, annualRate, years, paidMonths) {
  const pmt = monthlyPayment(principal, annualRate, years);
  const r = annualRate / 12;
  return principal * Math.pow(1 + r, paidMonths) -
    pmt * ((Math.pow(1 + r, paidMonths) - 1) / r);
}

/* =========================
PIPELINE SAVE
========================= */

function saveDeal() {
  if (!dealData.arv) analyzeDeal();

  const deals = JSON.parse(localStorage.getItem("rolyfeDealPipeline") || "[]");
  deals.unshift(dealData);
  localStorage.setItem("rolyfeDealPipeline", JSON.stringify(deals));

  loadPipeline();
  alert("Deal saved to pipeline.");
}

function loadPipeline() {
  const deals = JSON.parse(localStorage.getItem("rolyfeDealPipeline") || "[]");
  const box = document.getElementById("pipeline");

  if (!box) return;

  if (!deals.length) {
    box.innerHTML = "<p>No saved deals yet.</p>";
    return;
  }

  box.innerHTML = deals.map((d, i) => `
    <div class="deal">
      <strong>${d.address || "No address"}</strong><br>
      <span>${d.label}</span><br>
      <span>Score: ${d.score}/100 — ${scoreLabel(d.score)}</span><br>
      <span>ARV: ${money(d.arv)} | Price: ${money(d.price)}</span><br>
      <span>MAO: ${money(d.mao)} | Profit: ${money(d.profit)}</span><br>
      <button onclick="loadDeal(${i})">Load Deal</button>
      <button onclick="deleteDeal(${i})">Delete</button>
    </div>
  `).join("");
}

function loadDeal(i) {
  const deals = JSON.parse(localStorage.getItem("rolyfeDealPipeline") || "[]");
  const d = deals[i];

  document.getElementById("address").value = d.address;
  document.getElementById("arv").value = d.arv;
  document.getElementById("price").value = d.price;
  document.getElementById("repairs").value = d.repairs;
  document.getElementById("assignment").value = d.assignment;

  analyzeDeal();
}

function deleteDeal(i) {
  const deals = JSON.parse(localStorage.getItem("rolyfeDealPipeline") || "[]");
  deals.splice(i, 1);
  localStorage.setItem("rolyfeDealPipeline", JSON.stringify(deals));
  loadPipeline();
}

/* =========================
BUYER BLAST
========================= */

function buyerBlast() {
  if (!dealData.arv) analyzeDeal();

  const msg = `🔥 NEW DEAL ALERT

Property: ${dealData.address || "TBD"}
ARV: ${money(dealData.arv)}
Price: ${money(dealData.price)}
Repairs: ${money(dealData.repairs)}
Assignment Fee: ${money(dealData.assignment)}
Total Project Cost: ${money(dealData.totalProject)}
Equity Spread: ${money(dealData.equitySpread)}
Score: ${dealData.score}/100 — ${scoreLabel(dealData.score)}

Reply YES for details. Serious buyers only.`;

  navigator.clipboard.writeText(msg).then(() => {
    alert("Buyer blast copied.");
  }).catch(() => {
    alert(msg);
  });
}

/* =========================
PDF GENERATOR
========================= */

function generatePDF() {
  if (!dealData.arv) analyzeDeal();

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  let y = 12;

  function line(text, gap = 7) {
    const split = doc.splitTextToSize(String(text), 185);
    doc.text(split, 10, y);
    y += split.length * gap;
    if (y > 275) {
      doc.addPage();
      y = 12;
    }
  }

  doc.setFontSize(15);
  line("RO’Lyfe Deal Package");

  doc.setFontSize(11);
  line("Prepared by Root Of Lyfe Holdings LLC");
  line("Private Capital Broker | richman@rootoflyfe.com");
  line(" ");

  line("PROPERTY");
  line("Address: " + (dealData.address || "TBD"));
  line("ARV: " + money(dealData.arv));
  line("Purchase Price: " + money(dealData.price));
  line("Repairs: " + money(dealData.repairs));
  line("Assignment Fee: " + money(dealData.assignment));
  line(" ");

  line("INVESTOR VIEW");
  line("MAO: " + money(dealData.mao));
  line("Profit vs MAO: " + money(dealData.profit));
  line("Deal Label: " + dealData.label);
  line("Sniper Score: " + dealData.score + "/100 - " + scoreLabel(dealData.score));
  line(" ");

  line("LENDER VIEW");
  line("Total Project Cost: " + money(dealData.totalProject));
  line("Estimated Equity Spread: " + money(dealData.equitySpread));
  line(" ");

  line("PROTECTED CLAUSES");
  line("Buyer may assign this agreement to Richardson L. and/or Assigns, partners, affiliates, buyer entities, contractors, lenders, or funding partners.");
  line("Property is evaluated AS-IS, subject to inspection, contractor validation, title review, and final due diligence.");
  line("Final terms are subject to contract, underwriting, title review, lender approval, and buyer due diligence.");

  doc.save("ROlyfe_Deal_Package.pdf");
}

/* =========================
EMAIL / TEXT / CLOSE
========================= */

function sendEmail() {
  if (!dealData.arv) analyzeDeal();

  const body = encodeURIComponent(`RO’Lyfe Deal Package

Property: ${dealData.address}
ARV: ${money(dealData.arv)}
Purchase: ${money(dealData.price)}
Repairs: ${money(dealData.repairs)}
Assignment Fee: ${money(dealData.assignment)}
MAO: ${money(dealData.mao)}
Profit: ${money(dealData.profit)}
Score: ${dealData.score}/100
Label: ${dealData.label}

Contract Hub: ${CONTRACT_HUB}
Funding Link: ${FUNDING_LINK}`);

  window.open(`mailto:richman@rootoflyfe.com?subject=RO’Lyfe Deal Ready&body=${body}`, "_blank");
}

function sendText() {
  if (!dealData.arv) analyzeDeal();

  const msg = encodeURIComponent(`🔥 RO’Lyfe Deal Ready

${dealData.address}
ARV: ${money(dealData.arv)}
Price: ${money(dealData.price)}
Repairs: ${money(dealData.repairs)}
Score: ${dealData.score}/100
${dealData.label}`);

  window.open(`sms:?body=${msg}`, "_blank");
}

function openJamal() {
  window.open(JAMAL_LINK, "_blank");
}

function openContracts() {
  window.open(CONTRACT_HUB, "_blank");
}

function openFunding() {
  window.open(FUNDING_LINK, "_blank");
}

function openBuyers() {
  window.open(BUYER_NETWORK, "_blank");
}

function oneClickClose() {
  generatePDF();
  sendEmail();
  sendText();
  window.open(CONTRACT_HUB, "_blank");
  alert("🚀 PDF generated, email/text opened, and Contract Hub launched.");
}

/* =========================
LOAD
========================= */

window.onload = function () {
  loadPipeline();
};
