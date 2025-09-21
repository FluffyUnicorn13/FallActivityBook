document.addEventListener("DOMContentLoaded", () => {
  const letters = "autumn vibes only".replace(/\s/g, "").toLowerCase();
const validWords = [
"an","am","at","as","in","is","it","no","on","nu","yo","by","be","us","ti","un","so",
"bat","bats","bun","buns","bit","bits","bot","bots","bay","bays","boa","boas","ban","bans",
"tan","tons","ton","tab","tabs","tin","tins","not","notes","son","sons","sun","suns","nut","nuts",
"via","vias","vet","vets","yob","yobs","yon","yons","sue","sues","tie","ties","yin","yins",
"nab","nabs","lit","lits","sit","sits","sly","oil","oils","soy","soys","bin","bins",
"boon","boons","boat","boats","vain","vains","veto","vetos","vote","votes","nova","novas",
"tone","tones","oven","ovens","love","loves","vile","viles","vine","vines","silt","silts",
"lino","linos","lobe","lobes","nylon","lint","bent","bents","bite","bites","site","sites",
"tiny","tinies","unto","bail","bails","nob","nobs","bon","bons","mist","mists","into",
"bison","bisons","about","stain","stains","stone","stones","stove","stoves","vanity",
"violins","bovine","obtain","uneven","untie","unties","autumn","autumns","bounty","bounties",
"bonus","bonuses","blue","blues","blunt","bleat","blame","blast","bleak","boney","boast",
"boils","vital","vitals","vial","vials","vein","veins","veiny","voted","voter","vetoed",
"tabby","taboo","taber","talon","tombs","tonal","toned","tongs","tints","tinea","tines",
"titan","tomes","tummy","tuna","tunas","tune","tunes","tunic","nutsy","noun","nouns",
"novel","nobly","noble","noise","noisy","noted","notum","man","vibe","vibes","only",
"ante","antes","anti","antis","any","bane","banes","base","bases","baton","batons",
"beast","beasts","bitey","bluesy","bluntly","boney","bunsy","bust","busts","byte","bytes",
"cane","canes","cob","cobs","cobble","cobbles","cone","cones","cost","costs","cots","count",
"counts","cue","cues","dab","dabs","dine","dines","don","dons","done","dotes","dust","dusty",
"eon","eons","eat","eats","eye","eyes","fan","fans","fast","fats","fay","fays","fib","fibs",
"fine","fines","fist","fists","foe","foes","font","fonts","fun","funs","gain","gains",
"gas","gash","gob","gobs","gone","goes","gut","guts","hue","hues","hunt","hunts","ice",
"ices","inane","ions","jab","jabs","jet","jets","job","jobs","joy","joys","kite","kites",
"lab","labs","lace","laces","lain","lame","lames","lane","lanes","last","lats","lay","lays",
"lob","lobs","lobe","lobes","love","loves","main","mains","mat","mats","mate","mates",
"men","mint","mints","mob","mobs","moist","moistly","mon","mons","moon","moons","nab","nabs",
"nay","nays","net","nets","nob","nobs","none","nose","notes","nut","nuts","oat","oats",
"once","ones","open","opens","oven","ovens","out","outs","own","owns","pain","pains","pan",
"pans","pat","pats","paw","paws","pea","peas","pen","pens","pie","pies","pit","pits",
"pod","pods","pony","ponies","post","posts","pot","pots","pun","puns","put","puts","ray",
"rays","rib","ribs","riot","riots","rob","robs","rose","roses","rub","rubs","run","runs",
"rut","ruts","sat","sate","sates","say","says","sea","seas","set","sets","sib","sibs",
"sin","sins","sit","sits","sob","sobs","son","sons","sun","suns","tab","tabs","tan","tans",
"tap","taps","tob","tobs","toe","toes","ton","tons","tub","tubs","tun","tuns","vain","vains",
"van","vans","vat","vats","vet","vets","vie","vies","vin","vins","vote","votes","yob","yobs",
"yon","yons","yule","yum","yums"
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
