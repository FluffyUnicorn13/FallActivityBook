document.addEventListener("DOMContentLoaded", () => {
  const letters = "autumn vibes only".replace(/\s/g, "").toLowerCase();
const validWords = [
"an","am","at","as","in","is","it","no","on","nu","yo","by","be","us","ti","un","so",
"bat","bats","bun","buns","bit","bits","bot","bots","bay","bays","boa","boas","ban","bans","tan","tons","ton","tab","tabs","tin","tins","not","notes","son","sons","sun","suns","nut","nuts","via","vias","vet","vets","yob","yobs","yon","yons","sue","sues","tie","ties","yin","yins","nab","nabs","lit","lits","sit","sits","sly","oil","oils","soy","soys",
"bin","bins","boon","boons","boat","boats","vain","vains","veto","vetos","vote","votes","nova","novas","tone","tones","oven","ovens","love","loves","vile","viles","vine","vines","silt","silts","lino","linos","lobe","lobes","nylon","lint","bent","bents","bite","bites","site","sites","tiny","tinies","unto","bail","bails","nob","nobs","bon","bons","mist","mists","into","bison","bisons","about","stain","stains","stone","stones","stove","stoves","vanity","violins","bovine","obtain","uneven","untie","unties","autumn","autumns","bounty","bounties","bonus","bonuses","blue","blues","blunt","bleat","blame","blast","bleak","boney","boast","boils","vital","vitals","vial","vials","vein","veins","veiny","vote","voted","voter","vetoed","tabby","taboo","taber","talon","tombs","tonal","toned","tongs","tints","tinea","tines","titan","tomes","tummy","tuna","tunas","tune","tunes","tunic","nutsy","noun","nouns","novel","nobly","noble","noise","noisy","noted","notum","man", "vibe", "only"
];


  const minWordsToContinue = 3;

  let found = [];
  let pageStart = Date.now();

  const input = document.getElementById("wordInput");
  const submitBtn = document.getElementById("submitBtn");
  const foundList = document.getElementById("foundList");
  const nextBtn = document.getElementById("nextBtn");
  const statusDiv = document.getElementById("status");

  submitBtn.addEventListener("click", () => {
    let word = input.value.trim().toLowerCase();

    if (!word) return;

    if (!validWords.includes(word)) {
      statusDiv.textContent = "❌ Not a valid word from the phrase.";
    } else if (found.includes(word)) {
      statusDiv.textContent = "❌ You already found that word!";
    } else {
      found.push(word);
      const li = document.createElement("li");
      li.textContent = word;
      foundList.appendChild(li);
      statusDiv.textContent = `✅ Found ${found.length} of ${validWords.length} words!`;

      // Save number of words found for summary
      localStorage.setItem("page3WordsFound", found.length);

      if (found.length >= minWordsToContinue) {
        nextBtn.style.display = "inline-block";
      }
    }

    input.value = "";
    input.focus();
  });

  window.finishPage = function() {
    let elapsed = Date.now() - pageStart;
    let pageTimes = JSON.parse(localStorage.getItem("pageTimes")) || {};
    pageTimes["page3"] = elapsed;
    localStorage.setItem("pageTimes", JSON.stringify(pageTimes));
    window.location.href = "page4.html";
  };
});
