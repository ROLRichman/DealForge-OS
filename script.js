let dealData = {};
let cogoRunningTotal = 0;

function analyzeDeal(){
  let a = +document.getElementById("arv").value || 0;
  let p = +document.getElementById("price").value || 0;

  if(!a || !p){
    document.getElementById("dealResult").innerHTML = "<b>Enter ARV and Purchase Price</b>";
    return;
  }

  let overage = a - p;
  let profit = (a * 0.7) - p;
  let label = profit > 50000 ? "🔥 SOLID DEAL" : "⚠️ CHECK DEAL";

  dealData = { a, p, overage, profit };

  document.getElementById("dealResult").innerHTML = `
  <h3>💰 Deal Analysis</h3>
  ARV: $${a.toLocaleString()}<br><br>
  Purchase Price: $${p.toLocaleString()}<br><br>
  Overage: $${overage.toLocaleString()}<br><br>
  Estimated Profit: $${profit.toLocaleString()}<br><br>
  <b>${label}</b>`;
}

function calcRepairs(){
  let total = (+r1.value||0)+(+r2.value||0)+(+r3.value||0)+(+r4.value||0);
  repairOut.innerHTML = "Total Rehab: $" + total.toLocaleString();
}

function clearSig(){
  const canvas = document.getElementById("sig");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0,0,canvas.width,canvas.height);
}

function generatePDF(){
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  let y = 15;
  doc.text("RO'Lyfe Holdings LLC - Purchase Offer",10,y); y+=10;
  doc.text(`Property: ${document.getElementById("address").value}`,10,y); y+=8;
  doc.text(`ARV: $${dealData.a?.toLocaleString() || 0}`,10,y); y+=8;
  doc.text(`Purchase Price: $${dealData.p?.toLocaleString() || 0}`,10,y); y+=8;
  doc.text(`Overage: $${dealData.overage?.toLocaleString() || 0}`,10,y); y+=8;

  doc.text("- AS-IS Sale",10,y+=10);
  doc.text("- 14 Day Inspection",10,y+=8);
  doc.text("- Assignable Contract",10,y+=8);
  doc.text("- Contractor Assignment Allowed",10,y+=8);
  doc.text("- Seller Finance / Refinance Option Welcome",10,y+=8);

  doc.save("Deal_Offer.pdf");
}
