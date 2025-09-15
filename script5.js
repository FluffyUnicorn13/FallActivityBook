document.addEventListener("DOMContentLoaded", () => {
  // 20 Fall-themed words
  const words = [
    "autumn","leaves","pumpkin","harvest","acorn",
    "apple","cider","corn","maple","breeze",
    "hay","squirrel","crisp","forest","mushroom",
    "chilly","scarecrow","bonfire","sweater","gourd"
  ];

  // Shuffle the word order
  let shuffledWords = [...words].sort(() => 0.5 - Math.random());
  let currentIndex = 0;
  let correctCount = 0;
  const requiredCorrect = 10;

  // DOM references
  const scrambledWordDisplay = document.getElementById("scrambledWord");
  const input = document.getElementById("wordInput");
  const status = document.getElementById("status");
  const nextBtn = document.getElementById("nextBtn");
  const skipBtn = document.getElementById("skipBtn");

  // Function to scramble a word
  function shuffleWord(word) {
    return word
      .split('')
      .sort(() => 0.5 - Math.random())
      .join('');
  }

  // Show next word
  function showNextWord() {
    if (currentIndex >= shuffledWords.length) {
      // End of all words
      status.textContent = `You got ${correctCount} correct out of 20.`;
      if (correctCount >= requiredCorrect) {
        nextBtn.style.display = "inline-block";
      } else {
        status.textContent += " Try again!";
      }
      scrambledWordDisplay.textContent = "";
      return;
    }

    scrambledWordDisplay.textContent = shuffleWord(shuffledWords[currentIndex]);
    input.value = "";
    status.textContent = `Correct: ${correctCount} / ${requiredCorrect}`;
  }

  // Check answer
  function checkAnswer() {
    const answer = input.value.trim().toLowerCase();
    if (answer === shuffledWords[currentIndex]) {
      correctCount++;
      status.textContent = `✅ Correct! (${correctCount} / ${requiredCorrect})`;
    } else {
      status.textContent = `❌ Nope! The word was "${shuffledWords[currentIndex]}".`;
    }

    currentIndex++;
    if (correctCount >= requiredCorrect) {
      nextBtn.style.display = "inline-block";
      status.textContent = `🎉 You reached ${requiredCorrect} correct words!`;
      scrambledWordDisplay.textContent = "";
    } else {
      showNextWord();
    }
  }

  // Skip a word
  function skipWord() {
    currentIndex++;
    showNextWord();
  }

  // Event listeners
  document.getElementById("submitBtn").addEventListener("click", checkAnswer);
  skipBtn.addEventListener("click", skipWord);
  input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") checkAnswer();
  });

  // Start with first word
  showNextWord();

  // Finish page
  window.finishPage = function () {
    let pageTimes = JSON.parse(localStorage.getItem("pageTimes")) || {};
    pageTimes["page5"] = Date.now();
    localStorage.setItem("pageTimes", JSON.stringify(pageTimes));
    window.location.href = "page6.html";
  };
});
