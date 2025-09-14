document.addEventListener("DOMContentLoaded", () => {
  const letters = "autumn vibes only".replace(/\s/g, "").toLowerCase();
  const validWords = [
    "autumn","vibes","only","sun","bat","ton","nut","moon","ivy","bun",
    "vote","son","van","bit","tin","bin","oven","abut","tiny","nova"
  ]; // Example words – you can expand
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
