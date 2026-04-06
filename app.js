const SUPABASE_URL = "https://npukjptnqdlvwkejobby.supabase.co";
const SUPABASE_KEY = "sb_publishable_4Gq4e044KeJvhdrdXHCKQw_gWQrAs30";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ===================
// NAVIGATION
// ===================

function showSection(id) {
  document.querySelectorAll(".sectionPage").forEach(sec => {
    sec.style.display = "none";
  });

  document.getElementById(id).style.display = "block";
}

// ===================
// CREATE CAMPAIGN + QR
// ===================

async function createCampaign() {
  const name = document.getElementById("campaignName").value;
  const reviewLink = document.getElementById("reviewLink").value;

  if (!name || !reviewLink) {
    alert("Fill all fields");
    return;
  }

  const { data, error } = await supabase
    .from("campaigns")
    .insert([
      {
        name: name,
        google_review_link: reviewLink
      }
    ])
    .select();

  if (error) {
    console.log(error);
    alert("Error");
    return;
  }

  const campaign = data[0];

  const link = window.location.origin + "/play.html?campaign=" + campaign.id;

  // Mostrar link
  document.getElementById("result").innerHTML =
    "<p><b>Campaign created:</b></p>" +
    "<p>" + link + "</p>";

  // Generar QR
  document.getElementById("qrBox").innerHTML = "";

  QRCode.toCanvas(link, function (err, canvas) {
    if (!err) {
      document.getElementById("qrBox").appendChild(canvas);
    }
  });

  document.getElementById("qrLink").innerText = link;

  // Ir a QR automáticamente
  showSection("qr");
}
