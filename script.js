let deal = {};

// DEAL ENGINE
function runDeal(){

let arv = +val("arv");
let price = +val("price");

let cash = arv * 0.50;
let seller = arv * 0.65;
let finance = arv * 0.75;

deal = {arv, price, cash, seller, finance};

id("offers").innerHTML = `
Cash: $${cash}<br>
Seller Carry: $${seller}<br>
Seller Finance: $${finance}
`;

}

// REPAIRS
function calcRepairs(){
let r = val("repairs");
id("repairOut").innerHTML = "Rehab: $" + r;
}

// PDF EXPORT (WITH SIGNATURE)
function downloadPDF(){

const { jsPDF } = window.jspdf;
const doc = new jsPDF();

doc.text("Deal Report", 20,20);

doc.text(`Address: ${val("address")}`,20,40);
doc.text(`ARV: ${deal.arv}`,20,50);

doc.text(`Cash: ${deal.cash}`,20,70);
doc.text(`Seller: ${deal.seller}`,20,80);

let img = canvas.toDataURL();

doc.addImage(img, "PNG", 20,100,100,40);

doc.save("Deal.pdf");
}

// CONTRACT
function generateContract(){

let text = `
PURCHASE AGREEMENT

Buyer: Root Of Lyfe Holdings LLC
Address: ${val("address")}

Offer: $${deal.cash}

Assignable Contract.
`;

download(text,"contract.txt");
}

// SEND
function sendOffer(){

let msg = `
Deal: ${val("address")}
Cash: ${deal.cash}
Seller: ${deal.seller}
`;

window.open(`mailto:richman@rootoflyfe.com?subject=Deal&body=${encodeURIComponent(msg)}`);
}

// SIGNATURE (SMOOTH LINE)
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

ctx.lineWidth=2;
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
