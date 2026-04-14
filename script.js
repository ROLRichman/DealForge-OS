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
    rating = "⚠️ متوسط Deal";
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

<p><b>MAO:</b> $${mao.toFixed(0)}</p>

<p>💰 Cash: $${cash.toFixed(0)}</p>
<p>🏦 Seller: $${seller.toFixed(0)}</p>
<p>🔁 Refi: $${refi.toFixed(0)}</p>

<hr>

<p><b>Profit:</b> $${profit.toFixed(0)}</p>
<p class="${ratingClass}"><b>${rating}</b></p>
`;

}

function downloadPDF() {

const { jsPDF } = window.jspdf;
const doc = new jsPDF();

doc.setFontSize(16);
doc.text("DealForge OS - Deal Report", 20, 20);

doc.setFontSize(12);

let lines = resultsText.split("\n");
let y = 40;

lines.forEach(line => {
    doc.text(line, 20, y);
    y += 8;
});

doc.save("Deal-Report.pdf");
}

let blob = new Blob([content], { type: "text/plain" });
let link = document.createElement("a");

link.href = URL.createObjectURL(blob);
link.download = "Deal-Report.txt";
link.click();

}
