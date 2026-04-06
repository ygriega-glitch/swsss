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

// default load
showSection("dashboard");

// ===================
// CREATE CAMPAIGN
// ===================

async function createCampaign() {
  console.log("CLICK DETECTED");

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
    alert("Error creating campaign");
    return;
  }

  const campaign = data[0];

  const link = window.location.origin + "/play.html?campaign=" + campaign.id;

  alert("Campaign created!\n\n" + link);
}
