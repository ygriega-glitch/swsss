const SUPABASE_URL = "https://npukjptnqdlvwkejobby.supabase.co";
const SUPABASE_KEY = "sb_publishable_4Gq4e044KeJvhdrdXHCKQw_gWQrAs30";

// 🔥 FIX IMPORTANTE
const supabase = window.supabase
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;

// ===================
// NAVIGATION
// ===================

function showSection(id) {
  document.querySelectorAll(".sectionPage").forEach(sec => {
    sec.style.display = "none";
  });

  const el = document.getElementById(id);
  if (el) el.style.display = "block";
}

// ===================
// INIT (IMPORTANTE)
// ===================

document.addEventListener("DOMContentLoaded", () => {
  showSection("dashboard");
});

// ===================
// CREATE CAMPAIGN
// ===================

async function createCampaign() {

  console.log("CLICK");

  if (!supabase) {
    alert("Supabase not loaded");
    return;
  }

  const name = document.getElementById("campaignName")?.value;
  const reviewLink = document.getElementById("reviewLink")?.value;

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
