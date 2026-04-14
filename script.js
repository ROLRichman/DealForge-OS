let deal = {};
let inspectionTotal = 0;

// DEAL
function runDeal(){

let arv = +val("arv");
let price = +val("price");

let cash = arv * 0.50;
let seller = arv * 0.65;
let finance = arv * 0.75;

let overage = arv - price;

deal = {arv, price, cash, seller, finance};

id("offers").innerHTML = `
Cash: $${cash}<br>
Seller: $${seller}<br>
Finance: $${finance}
`;

id("overage").innerHTML = `
Overage: $${overage} ${overage > 50000 ? "🔥 IT'S A DEAL" : ""}
`;

}

// QUICK REPAIR
function calcQuick(){
let total =
(+val("roof")||0)+
(+val("floor")||0)+
(+val("electrical")||0)+
(+val("plumbing")||0);

id("quickOut").innerHTML = "Total: $" + total;
}

// INSPECTION
function addInspection(){

let name = id("inspection").options[id("inspection").selectedIndex].text;
let cost = +val("inspectCost");

inspectionTotal += cost;

id("inspectionList").innerHTML += `${name}: $${cost}<br>`;
id("inspectionTotal").innerHTML = "Total: $" + inspectionTotal;

}

// CONTRACT (FULL CLAUSES)
function generateContract(){

let text = `
PURCHASE AGREEMENT

Buyer: Root Of Lyfe Holdings LLC
Address: ${val("address")}

Offer Price: $${deal.cash}

ASSIGNMENT:
Buyer may assign this contract.

INSPECTION:
Buyer has 10 day inspection period.

EXIT CLAUSE:
Buyer may cancel during inspection.

MARKETING:
Buyer may market property.

DOUBLE CLOSE:
Buyer may close directly or assign.

`;

download(text,"contract.txt");
}

// PDF
function downloadPDF(){

const { jsPDF } = window.jspdf;
const doc = new jsPDF();

doc.text("Deal Report",20,20);
doc.text(`Address: ${val("address")}`,20,30);

doc.text(`Cash: ${deal.cash}`,20,50);

let img = canvas.toDataURL();
doc.addImage(img,"PNG",20,100,100,40);

doc.save("deal.pdf");
}

// SEND
function sendOffer(){
window.open(`mailto:richman@rootoflyfe.com`);
}

// SEARCH
function openZillow(){
window.open("https://www.zillow.com");
}
function openRedfin(){
window.open("https://www.redfin.com");
}

// SIGNATURE FIXED
let canvas = document.getElementById("sigPad");
let ctx = canvas.getContext("2d");

let drawing=false;

canvas.addEventListener("touchstart",e=>{
drawing=true;
ctx.beginPath();
});

canvas.addEventListener("touchmove",e=>{
if(!drawing) return;

let rect=canvas.getBoundingClientRect();
let x=e.touches[0].clientX-rect.left;
let y=e.touches[0].clientY-rect.top;

ctx.lineWidth=3;
ctx.lineCap="round";

ctx.lineTo(x,y);
ctx.stroke();
});

canvas.addEventListener("touchend",()=>drawing=false);

function clearSig(){
ctx.clearRect(0,0,canvas.width,canvas.height);
}

// HELPERS
function val(id){return document.getElementById(id).value}
function id(id){return document.getElementById(id)}

function download(text,name){
let blob=new Blob([text]);
let a=document.createElement("a");
a.href=URL.createObjectURL(blob);
a.download=name;
a.click();
            }
