let dealData = {};
let pipeline = JSON.parse(localStorage.getItem("rolyfePipeline") || "[]");

const LINKS = {
  jamal: "https://agent.jotform.com/019bdd1fe57172838101dccf3612b1e9e787",
  contracts: "https://rolrichman.github.io/rolyfe-contract-documents-hub/",
  funding: "https://workdrive.zohoexternal.com/file/g6vcbdaba9ad8d815404a873a060254fe1bfc",
  buyers: "https://rolrichman.github.io/RO-Lyfe-Buyer-Network-OS/",
  dealforge: "https://rolrichman.github.io/DealForge-OS/"
};

function n(id){return Number(String(document.getElementById(id)?.value || "0").replace(/,/g,"")) || 0}
function v(id){return document.getElementById(id)?.value || ""}
function money(x){return Number(x||0).toLocaleString("en-US",{maximumFractionDigits:0})}

function openJamal(){
  window.open(LINKS.jamal + "?embedMode=popup&parentURL=" + encodeURIComponent(window.location.href), "Jamal", "scrollbars=yes,toolbar=no,width=760,height=620");
}
function openZillow(){window.open("https://www.zillow.com/homes/" + encodeURIComponent(v("address")),"_blank")}
function openRedfin(){window.open("https://www.redfin.com/search?q=" + encodeURIComponent(v("address")),"_blank")}
function openUSDA(){window.open("https://eligibility.sc.egov.usda.gov/eligibility/welcomeAction.do?pageAction=sfp","_blank")}

function analyzeDeal(){
  const address=v("address"), arv=n("arv"), price=n("price"), repairs=n("repairs"), assignment=n("assignment");
  if(!arv || !price){alert("Enter ARV + Purchase / Offer Price");return}
  const mao = arv*.70 - repairs - assignment;
  const overage = arv - price;
  const profitVsMao = mao - price;
  const totalProjectCost = price + repairs + assignment;
  const equitySpread = arv - totalProjectCost;
  const profitSpread = arv - totalProjectCost;
  const score = sniperScore(arv, price, repairs, assignment, profitVsMao, equitySpread);
  const scoreLabel = score >= 75 ? "🟢 SNIPER" : score >= 56 ? "🟡 BUILD" : score >= 31 ? "⚪ NEUTRAL" : "🔴 SHORT";
  let status = "⚠️ CHECK DEAL", statusClass="check";
  if(profitVsMao >= 25000 && equitySpread >= 75000){status="🔥 SOLID DEAL";statusClass="solid"}
  if(profitVsMao < 0){status="❌ PASS";statusClass="pass"}
  const next = statusClass === "pass"
    ? "This deal does NOT work at asking price. It ONLY works if you control it below MAO. Move now or pass."
    : "Structure offer, open contract hub, or send to funding.";
  dealData = {address,arv,price,repairs,assignment,mao,overage,profitVsMao,totalProjectCost,equitySpread,profitSpread,score,scoreLabel,status,statusClass,next,date:new Date().toLocaleString()};
  document.getElementById("dealResult").innerHTML = `
    <h2>💰 Deal Analysis</h2>
    <p><b>Property:</b> ${address || "N/A"}</p>
    <p><b>ARV:</b> $${money(arv)}</p>
    <p><b>Purchase / Offer:</b> $${money(price)}</p>
    <p><b>Rehab:</b> $${money(repairs)}</p>
    <p><b>Assignment Fee:</b> $${money(assignment)}</p>
    <p><b>Overage:</b> $${money(overage)}</p>
    <p><b>MAO:</b> $${money(mao)}</p>
    <p><b>Profit vs MAO:</b> $${money(profitVsMao)}</p>
    <p><b>Total Project Cost:</b> $${money(totalProjectCost)}</p>
    <p><b>Equity Spread:</b> $${money(equitySpread)}</p>
    <p><b>Sniper Score:</b> ${score}/100 — ${scoreLabel}</p>
    <div class="status ${statusClass}">${status}</div>
    <hr>
    <p><b>Next Move:</b><br>${next}</p>
  `;
  document.getElementById("tierArv").value = arv;
}
function sniperScore(arv, price, repairs, assignment, profit, equity){
  const costRatio = (price+repairs+assignment)/arv;
  let score = 100;
  score -= Math.max(0,(costRatio-.62)*160);
  score += Math.min(20, profit/2500);
  score += Math.min(18, equity/10000);
  return Math.max(0, Math.min(100, Math.round(score)));
}
function resetDeal(){["address","arv","price","repairs","assignment","closingDate"].forEach(id=>{const el=document.getElementById(id); if(el) el.value=""}); document.getElementById("dealResult").innerHTML="<h2>💰 Deal Analysis</h2><p>Reset complete.</p>"; dealData={};}

function pmt(rate, years, principal){
  const r = rate/12, m = years*12;
  return principal * (r*Math.pow(1+r,m))/(Math.pow(1+r,m)-1);
}
function balloon(balance, rate, years, paidYears, monthly){
  let b=balance, r=rate/12;
  for(let i=0;i<paidYears*12;i++){ b = b*(1+r)-monthly; }
  return Math.max(0,b);
}
function run3Tier(){
  const arv = n("tierArv") || n("arv");
  if(!arv){alert("Enter ARV");return}
  const cash=arv*.50, carry=arv*.65, finance=arv*.75;
  const carryDown=carry*.05, carryBal=carry-carryDown, carryPay=pmt(.05,30,carryBal), carryBalloon=balloon(carryBal,.05,30,4,carryPay);
  const finBal=finance, finPay=pmt(.06,30,finBal), finBalloon=balloon(finBal,.06,30,5,finPay);
  document.getElementById("tierResults").innerHTML=`
    <h3>All Cash</h3><p>Cash Offer: $${money(cash)}</p>
    <h3>Seller Carry</h3>
    <p>Purchase Price: $${money(carry)}<br>Buyer Down Payment: $${money(carryDown)}<br>Seller Carry Balance: $${money(carryBal)}<br>Monthly Payment: $${money(carryPay)}<br>4-Year Balloon: $${money(carryBalloon)}</p>
    <p>Buyer to pay $${money(carryDown)} down, Seller to Carry 1st mortgage in the amount of $${money(carryBal)} at 5.00% fully amortizing for 30 years, with monthly payments of $${money(carryPay)} and a 4 year balloon payment of $${money(carryBalloon)}.</p>
    <h3>Seller Financing</h3>
    <p>Purchase Price: $${money(finance)}<br>Buyer Down Payment: $0<br>Seller Financing Balance: $${money(finBal)}<br>Monthly Payment: $${money(finPay)}<br>5-Year Balloon: $${money(finBalloon)}</p>
    <p>Buyer to pay $0 down, Seller to Carry 1st mortgage in the amount of $${money(finBal)} at 6.00% fully amortizing for 30 years, with monthly payments of $${money(finPay)} and a 5 year balloon payment of $${money(finBalloon)}.</p>
  `;
}

function getCheckedRepairs(){return [...document.querySelectorAll(".check-grid input:checked")].map(x=>x.value).join(", ")}
function dealText(){
  const d=dealData.address ? dealData : {address:v("address"),arv:n("arv"),price:n("price"),repairs:n("repairs"),assignment:n("assignment"),mao:n("arv")*.70-n("repairs")-n("assignment"),status:"Deal Ready",score:"",scoreLabel:""};
  return `🔥 RO’Lyfe Deal Package
Property: ${d.address}
ARV: $${money(d.arv)}
Purchase / Offer: $${money(d.price)}
Rehab: $${money(d.repairs)}
Assignment Fee: $${money(d.assignment)}
MAO: $${money(d.mao)}
Status: ${d.status}
Sniper Score: ${d.score || "N/A"} ${d.scoreLabel || ""}

Rehab Items: ${getCheckedRepairs() || "TBD"}
Exit Strategy: ${v("exitStrategy")}
Loan Type: ${v("loanType")}
Notes: ${v("contractorNotes")}

Next Step: Structure offer, open Contract Hub, or send to Funding.`;
}
function copyDeal(){navigator.clipboard.writeText(dealText());alert("📋 Deal copied.")}
function emailDeal(){window.open("mailto:richman@rootoflyfe.com?subject=RO’Lyfe Deal Ready&body="+encodeURIComponent(dealText()),"_blank")}
function textDeal(){window.open("sms:?body="+encodeURIComponent(dealText()),"_blank")}
function oneClickClose(){generatePDF();copyDeal();emailDeal();textDeal();}

function generatePDF(){
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({unit:"pt",format:"letter"});
  const d=dealData.address ? dealData : (analyzeDeal(), dealData);
  let y=44;
  doc.setFont("helvetica","bold"); doc.setFontSize(18); doc.text("RO’Lyfe Protected Deal Package",40,y); y+=28;
  doc.setFont("helvetica","normal"); doc.setFontSize(11);
  const lines = [
    `Property: ${d.address}`,`ARV: $${money(d.arv)}`,`Purchase / Offer: $${money(d.price)}`,`Repairs: $${money(d.repairs)}`,`Assignment Fee: $${money(d.assignment)}`,
    `MAO: $${money(d.mao)}`,`Total Project Cost: $${money(d.totalProjectCost)}`,`Equity Spread: $${money(d.equitySpread)}`,`Sniper Score: ${d.score}/100 ${d.scoreLabel}`,`Deal Label: ${d.status}`,
    `Closing Date: ${v("closingDate")}`,`Loan Type: ${v("loanType")}`,`Exit Strategy: ${v("exitStrategy")}`,`COGO / Repairs: ${getCheckedRepairs() || "TBD"}`,`Contractor Notes: ${v("contractorNotes") || "N/A"}`
  ];
  lines.forEach(line=>{doc.text(line,40,y); y+=18;});
  y+=12; doc.setFont("helvetica","bold"); doc.text("Execution Clauses",40,y); y+=18; doc.setFont("helvetica","normal");
  const clauses = "AS-IS purchase. 14-day inspection period. Buyer may assign contract. Buyer may coordinate with funding partners, contractors, affiliates, inspectors, and closing partners. Submission does not guarantee funding, approval, or closing. Final documents should be reviewed by the appropriate professionals.";
  doc.splitTextToSize(clauses,520).forEach(line=>{doc.text(line,40,y); y+=15;});
  const canvas=document.getElementById("sig");
  if(canvas){
    try{doc.text("Signature:",40,y+20); doc.addImage(canvas.toDataURL("image/png"),"PNG",40,y+30,180,60)}catch(e){}
  }
  doc.save("RO-Lyfe-Deal-Package.pdf");
}

function saveDeal(){
  if(!dealData.address) analyzeDeal();
  pipeline.unshift({...dealData,id:Date.now()});
  localStorage.setItem("rolyfePipeline",JSON.stringify(pipeline));
  renderPipeline();
}
function loadDeal(id){
  const d=pipeline.find(x=>x.id===id); if(!d)return;
  document.getElementById("address").value=d.address;document.getElementById("arv").value=d.arv;document.getElementById("price").value=d.price;document.getElementById("repairs").value=d.repairs;document.getElementById("assignment").value=d.assignment; analyzeDeal();
}
function deleteDeal(id){pipeline=pipeline.filter(x=>x.id!==id);localStorage.setItem("rolyfePipeline",JSON.stringify(pipeline));renderPipeline();}
function renderPipeline(){
  const out=document.getElementById("pipeline"); if(!out)return;
  out.innerHTML=pipeline.map(d=>`<div class="pipeline-item"><h3>${d.address}</h3><p>${d.status}<br>Score: ${d.score}/100 — ${d.scoreLabel}<br>ARV: $${money(d.arv)} | Price: $${money(d.price)}<br>MAO: $${money(d.mao)} | Profit: $${money(d.profitVsMao)}</p><button onclick="loadDeal(${d.id})">Load Deal</button><button onclick="deleteDeal(${d.id})">Delete</button></div>`).join("");
}

function initSignature(){
  const canvas=document.getElementById("sig");
  if(!canvas)return;
  const ctx=canvas.getContext("2d");
  function resizeCanvas(){
    const data=canvas.toDataURL();
    canvas.width=canvas.offsetWidth;
    canvas.height=220;
    ctx.lineWidth=3;
    ctx.strokeStyle="#111";
    ctx.lineCap="round";
    const img=new Image();
    img.onload=()=>ctx.drawImage(img,0,0);
    img.src=data;
  }
  resizeCanvas(); window.addEventListener("resize",resizeCanvas);
  let drawing=false;
  function pos(e){const r=canvas.getBoundingClientRect(); const t=e.touches?e.touches[0]:e; return {x:t.clientX-r.left,y:t.clientY-r.top}}
  function start(e){e.preventDefault();drawing=true;const p=pos(e);ctx.beginPath();ctx.moveTo(p.x,p.y)}
  function draw(e){if(!drawing)return;e.preventDefault();const p=pos(e);ctx.lineTo(p.x,p.y);ctx.stroke()}
  function stop(){drawing=false;ctx.beginPath()}
  canvas.addEventListener("mousedown",start);canvas.addEventListener("mousemove",draw);canvas.addEventListener("mouseup",stop);canvas.addEventListener("mouseleave",stop);
  canvas.addEventListener("touchstart",start,{passive:false});canvas.addEventListener("touchmove",draw,{passive:false});canvas.addEventListener("touchend",stop);
}
function clearSig(){const c=document.getElementById("sig"); if(c)c.getContext("2d").clearRect(0,0,c.width,c.height)}

window.addEventListener("load",()=>{initSignature();renderPipeline();});
