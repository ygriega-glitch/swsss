function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => {
    sec.classList.remove('active');
  });

  document.getElementById(id).classList.add('active');
}

let campaigns = [];

function createCampaign() {
  const name = document.getElementById("campaignName").value;
  const link = document.getElementById("reviewLink").value;

  if (!name || !link) {
    alert("Fill all fields");
    return;
  }

  const campaign = { name, link };
  campaigns.push(campaign);

  renderCampaigns();

  document.getElementById("campaignName").value = "";
  document.getElementById("reviewLink").value = "";

  alert("Campaign created");
}

function renderCampaigns() {
  const container = document.getElementById("campaignList");
  container.innerHTML = "";

  campaigns.forEach(c => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h3>${c.name}</h3>
      <p>${c.link}</p>
    `;
    container.appendChild(div);
  });
}

function generateQR() {
  const link = document.getElementById("qrLink").value;

  if (!link) {
    alert("Paste a link");
    return;
  }

  const canvas = document.getElementById("qrCanvas");

  QRCode.toCanvas(canvas, link, function (error) {
    if (error) console.error(error);
  });
}
