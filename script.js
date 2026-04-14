let resultsText = "";

function analyzeDeal() {

let arv = +document.getElementById("arv").value;
let price = +document.getElementById("price").value;
let rehab = +document.getElementById("rehab").value;
let fee = +document.getElementById("fee").value;
let months = +document.getElementById("months").value;

// CORE MATH
let mao = (arv * 0.65) - rehab;
let cash = mao - fee;
let seller = mao + 10000;
let refi = (arv * 0.7) - rehab;

// COSTS
let holding = months * 2000;
let profit = arv - (price + rehab + fee + holding);

// DEAL RATING
let rating = "";
let ratingClass = "";

if (profit > 50000) {
    rating = "🔥 Strong Deal";
    ratingClass = "good";
} else if (profit > 20000) {
    rating = "⚠️ Solid Deal";
    ratingClass = "warn";
} else {
    rating = "❌ Bad Deal";
    ratingClass = "bad";
}

// STORE TEXT
resultsText = `
ARV: $${arv}
Purchase: $${price}
Rehab: $${rehab}

MAO: $${mao}
Cash Offer: $${cash}
Seller Offer: $${seller}
Refi Offer: $${refi}

Profit: $${profit}
Rating: ${rating}
`;

// DISPLAY
document.getElementById("results").innerHTML = `
<h3>📊 Results</h3>

<div class="result-line"><span>MAO</span><b>$${mao.toFixed(0)}</b></div>
<div class="result-line"><span>Cash</span><b>$${cash.toFixed(0)}</b></div>
<div class="result-line"><span>Seller</span><b>$${seller.toFixed(0)}</b></div>
<div class="result-line"><span>Refi</span><b>$${refi.toFixed(0)}</b></div>

<hr>

<div class="result-line"><span>Profit</span><b>$${profit.toFixed(0)}</b></div>
<p class="${ratingClass}"><b>${rating}</b></p>
`;
}

// 📧 EMAIL
function sendEmail() {
let subject = "Deal Analysis";
let body = encodeURIComponent(resultsText);

window.location.href = `mailto:richman@rootoflyfe.com?subject=${subject}&body=${body}`;
}

// 📊 PDF EXPORT
function downloadPDF() {

const { jsPDF } = window.jspdf;
const doc = new jsPDF();

doc.setFontSize(16);
doc.text("DealForge OS - Deal Report", 20,
