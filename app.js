let prizes = JSON.parse(localStorage.getItem("prizes")) || [];

// -------- DASHBOARD --------

function addPrize(){
  let name = document.getElementById("name").value;
  let chance = parseFloat(document.getElementById("chance").value);

  if(!name || !chance){
    alert("Fill all fields");
    return;
  }

  prizes.push({name, chance});
  localStorage.setItem("prizes", JSON.stringify(prizes));

  render();
}

function render(){
  let html = "";
  let total = 0;

  prizes.forEach(p=>{
    total += p.chance;
    html += `<div>${p.name} - ${p.chance}%</div>`;
  });

  html += `<p>Total: ${total}%</p>`;

  document.getElementById("list").innerHTML = html;
}

if(document.getElementById("link")){
  document.getElementById("link").innerText =
    window.location.origin + "/play.html";
}

render();

// -------- REVIEW SYSTEM --------

let startTime = null;

function goReview(){
  startTime = Date.now();
  window.open("https://google.com", "_blank");
}

document.addEventListener("visibilitychange", ()=>{
  if(!document.hidden && startTime){
    let time = (Date.now() - startTime) / 1000;

    if(time > 10){
      let unlockBtn = document.getElementById("unlock");
      unlockBtn.disabled = false;
      unlockBtn.innerText = "Spin Unlocked";
    }
  }
});

// -------- UNLOCK --------

document.getElementById("unlock")?.addEventListener("click", ()=>{
  document.getElementById("wheel").style.display = "block";
});

// -------- SPIN LOGIC --------

function spin(){
  let rand = Math.random() * 100;
  let acc = 0;

  for(let p of prizes){
    acc += p.chance;

    if(rand < acc){
      document.getElementById("result").innerText = "You won: " + p.name;

      let code = generateCode();
      localStorage.setItem("win", p.name);
      localStorage.setItem("code", code);

      return;
    }
  }
}

// -------- CODE GENERATION --------

function generateCode(){
  return "CODE-" + Math.floor(Math.random() * 99999);
}

// -------- SAVE LEAD --------

function save(){
  let email = document.getElementById("email").value;
  let prize = localStorage.getItem("win");
  let code = localStorage.getItem("code");

  if(!email){
    alert("Enter email");
    return;
  }

  console.log("SAVE:", email, prize, code);

  alert(
    "Reward sent!\n\n" +
    "Prize: " + prize +
    "\nCode: " + code
  );
}
