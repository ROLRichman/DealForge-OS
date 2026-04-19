function openZillow(){
  const address = document.getElementById("address").value;
  window.open("https://www.zillow.com/homes/" + encodeURIComponent(address));
}

function openRedfin(){
  const address = document.getElementById("address").value;
  window.open("https://www.redfin.com/search?q=" + encodeURIComponent(address));
}

function openRural(){
  window.open("https://eligibility.sc.egov.usda.gov/");
}

function analyzeDeal(){
  const arv = Number(document.getElementById("arv").value || 0);
  const price = Number(document.getElementById("price").value || 0);

  const overage = arv - price;
  const profit = (arv * 0.7) - price;

  document.getElementById("dealResult").innerHTML = `
    <h3>💰 Deal Analysis</h3>
    <p><b>ARV:</b> $${arv.toLocaleString()}</p>
    <p><b>Price:</b> $${price.toLocaleString()}</p>
    <p><b>Overage:</b> $${overage.toLocaleString()}</p>
    <p><b>Profit:</b> $${profit.toLocaleString()}</p>
  `;
}

function resetDeal(){
  document.getElementById("address").value = "";
  document.getElementById("arv").value = "";
  document.getElementById("price").value = "";
  document.getElementById("closingDate").value = "";
  document.getElementById("dealResult").innerHTML = "";
}
