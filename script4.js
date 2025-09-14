document.addEventListener("DOMContentLoaded", () => {
  let pageStart = Date.now();
  const submitBtn = document.getElementById("submitBtn");
  const statusDiv = document.getElementById("status");
  const nextBtn = document.getElementById("nextBtn");

  const correctAnswers = {
    riddle1: "leaves",
    riddle2: "wind",
    riddle3: "harvestmoon"
  };

  submitBtn.addEventListener("click", () => {
    const form = document.getElementById("riddleForm");
    let allCorrect = true;

    for (let key in correctAnswers) {
      const selected = form.elements[key].value;
      if (selected !== correctAnswers[key]) {
        allCorrect = false;
      }
    }

    if (allCorrect) {
      statusDiv.textContent = "🎉 All answers are correct!";
      nextBtn.style.display = "inline-block";
    } else {
      statusDiv.textContent = "Some answers are incorrect. Try again!";
    }
  });

  window.finishPage = function() {
    let elapsed = Date.now() - pageStart;
    let pageTimes = JSON.parse(localStorage.getItem("pageTimes")) || {};
    pageTimes["page4"] = elapsed;
    localStorage.setItem("pageTimes", JSON.stringify(pageTimes));
    window.location.href = "page5.html";
  };
});
