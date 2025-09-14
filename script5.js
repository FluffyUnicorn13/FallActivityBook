document.addEventListener("DOMContentLoaded", () => {
  const words = [
    "autumn","leaves","harvest","pumpkin","cider",
    "acorn","apple","scarecrow","crisp","bonfire",
    "foliage","hayride","sweater","chilly","cornucopia",
    "nuts","harvestmoon","gourds","haystack","migration"
  ];

  let scrambledWords = words.map(word => scrambleWord(word));
  let currentIndex = 0;
  let found = [];
  let pageStart = Date.now();

  const scrambledDiv = document.getElementById("scrambledWord");
  const input = document.getElementById("wordInput");
  const submitBtn = document.getElementById("submitBtn");
  const foundList = document.getElementById("foundList");
  const nextBtn = document.getElementById("nextBtn");

  // Show first scrambled word
  scrambledDiv.textContent = scrambledWords[currentIndex];

  submitBtn.addEventListener("click", () => {
    let val = input.value.trim().toLowerCase();
    const correctWord = words[currentIndex];

    if (val === correctWord) {
      // Add to found list
      const li = document.createElement("li");
      li.textContent = correctWord;
      foundList.appendChild(li);
      found.push(correctWord);

      input.value = "";
      currentIndex++;

      if (currentIndex < scrambledWords.length) {
        scrambledDiv.textContent = scrambledWords[currentIndex];
      } else {
        scrambledDiv.textContent = "All words unscrambled!";
        nextBtn.style.display = "inline-block";
      }
    } else {
      alert("Incorrect! Try again.");
      input.value = "";
    }
  });

  function scrambleWord(word) {
    const arr = word.split("");
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join("");
  }

  window.finishPage = function() {
    let elapsed = Date.now() - pageStart;
    let pageTimes = JSON.parse(localStorage.getItem("pageTimes")) || {};
    pageTimes["page5"] = elapsed;
    localStorage.setItem("pageTimes", JSON.stringify(pageTimes));
    window.location.href = "page6.html";
  };
});
