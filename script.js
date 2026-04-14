let dealData = {};

// RUN DEAL
function runDeal(){

let arv = +val("arv");
let price = +val("price");

// 3 TIER
let cash = arv * 0.50;
let seller = arv * 0.65;
let finance = arv * 0.75;

// PAYMENTS
let down = seller * 0.05;
let loan = seller - down;

let monthly = Math.round((loan * 0.05)/12);

dealData = {arv, price, cash, seller, finance};

id("offers").innerHTML = `
<b>Cash:</b> $${cash}<br>

<b>Seller Carry:</b> $${seller}<br>
Down: $${down}<br>
Monthly: $${monthly}<br>

<b>Seller Finance:</b> $${finance}
`;

}

// CONTRACT (REAL CLAUSE)
function generateContract(){

let text = `
PURCHASE AGREEMENT

Buyer: Root Of Lyfe Holdings LLC

Property: ${val("address")}

Purchase Price: $${dealData.cash}

ASSIGNMENT CLAUSE:
Buyer retains the right to assign this contract.

NON-REFUNDABLE DEPOSIT:
Earnest money becomes non-refundable upon inspection period.

CLOSING:
Closing to occur within 14-30 days.

`;

download(text, "Contract.txt");
}

// SEND OFFER
function sendOffer(){

let msg = `
Offer for ${val("address")}

Cash: $${dealData.cash}
Seller: $${dealData.seller}
Finance: $${dealData.finance}
`;

window.open(`mailto:?subject=Offer&body=${encodeURIComponent(msg)}`);
}

// SIGNATURE (FIXED MOBILE)
let canvas = document.getElementById("sigPad");
let ctx = canvas.getContext("2d");

let drawing = false;

canvas.addEventListener("touchstart", e=>{
drawing = true;
e.preventDefault();
});

canvas.addEventListener("touchend", ()=>{
drawing = false;
});

canvas.addEventListener("touchmove", e=>{
if(!drawing) return;

let rect = canvas.getBoundingClientRect();
let x = e.touches[0].clientX - rect.left;
let y = e.touches[0].clientY - rect.top;

ctx.fillRect(x,y,2,2);

e.preventDefault();
});

function clearSig(){
ctx.clearRect(0,0,canvas.width,canvas.height);
}

// HELPERS
function val(id){ return document.getElementById(id).value }
function id(id){ return document.getElementById(id) }

function download(text,name){
let blob = new Blob([text],{type:"text/plain"});
let a=document.createElement("a");
a.href=URL.createObjectURL(blob);
a.download=name;
a.click();
}
