let dealData = {};

// ANALYZE DEAL
function analyzeDeal(){
let arv = +document.getElementById("arv").value;
let price = +document.getElementById("price").value;
let address = document.getElementById("address").value;

let cash = arv * 0.5;
let seller = arv * 0.65;
let finance = arv * 0.75;

let down = seller * 0.05;
let monthly = (seller - down) * 0.006;
let monthly2 = finance * 0.005;

let overage = arv - price;

dealData = {arv, price, address, cash, seller, finance, down, monthly, monthly2, overage};

document.getElementById("results").innerHTML = `
<h3>💰 3 Tier Offers</h3>
Cash: $${cash.toFixed(0)}<br>
Seller Carry: $${seller.toFixed(0)}<br>
Down: $${down.toFixed(0)}<br>
Monthly: $${monthly.toFixed(0)}<br><br>
Seller Finance: $${finance.toFixed(0)}<br>
Monthly: $${monthly2.toFixed(0)}<br><br>
Overage: $${overage.toFixed(0)}<br>
<b>🔥 IT'S A DEAL!</b>
`;
}


function generateContract(){

const { jsPDF } = window.jspdf;
let doc = new jsPDF();

let sig = document.getElementById("sig").toDataURL();

// PURCHASE AGREEMENT
let contract = `
PURCHASE AGREEMENT

Buyer: Root Of Lyfe Holdings LLC
Address: ${dealData.address}

Purchase Price: $${dealData.price}
Estimated ARV: $${dealData.arv}

TERMS:
- This agreement is fully assignable.
- Buyer retains the right to market property.
- Inspection period: 14 days minimum.
- Buyer may cancel without penalty during inspection.
- Buyer may perform double closing if needed.
- Seller agrees not to circumvent buyer.

EXIT STRATEGY:
Buyer may assign, wholesale, or refinance.

This agreement protects buyer’s equitable interest.

SELLER SIGNATURE: ______________________

BUYER:
Richardson L.
Root Of Lyfe Holdings LLC
`;

doc.text(contract, 10, 10);

// ADD SIGNATURE
doc.addImage(sig, "PNG", 20, 180, 80, 30);

doc.save("Purchase-Agreement.pdf");

function brokerAgreement(){

const { jsPDF } = window.jspdf;
let doc = new jsPDF();

let text = `
CLIENT BROKER FEE AGREEMENT

Broker: Root Of Lyfe Holdings LLC
Broker Fee: 3%

Client agrees to pay broker 3% upon successful funding.

Non-Circumvention:
Client may not bypass broker.

Term: 6 months

Broker:
Richardson L.
Email: richman@rootoflyfe.com
`;

doc.text(text, 10, 10);
doc.save("Broker-Agreement.pdf");
}  
}


function preApp(){

const { jsPDF } = window.jspdf;
let doc = new jsPDF();

let text = `
PRE-LOAN APPLICATION

Broker:
Root Of Lyfe Holdings LLC
Richardson L.
richman@rootoflyfe.com

Property:
${dealData.address}

Purchase Price:
$${dealData.price}

ARV:
$${dealData.arv}

Estimated Profit:
$${dealData.overage}

Loan Purpose:
Fix & Flip

Signature: ______________________
`;

doc.text(text, 10, 10);
doc.save("PreApp.pdf");
}
