document.addEventListener("DOMContentLoaded", () => {
  let pageStart = Date.now();
  const submitBtn = document.getElementById("submitBtn");
  const statusDiv = document.getElementById("status");
  const nextBtn = document.getElementById("nextBtn");

  const correctAnswers = {
    q1: "sweater",
    q2: "squirrels",
    q3: "ducks",
    q4: "cider",
    q5: "leaves"
  };

  submitBtn.addEventListener("click", () => {
    const form = document.getElementById("quizForm");
    let allCorrect = true;
    let incorrectQuestions = [];

    for (let key in correctAnswers) {
      let val;
      if (key === "q5") {
        val = form.elements[key].value.trim().toLowerCase();
      } else {
        const selected = form.elements[key];
        val = selected.value;
      }

      if (val !== correctAnswers[key]) {
        allCorrect = false;
        incorrectQuestions.push(key);
      }
    }

    if (allCorrect) {
      statusDiv.textContent = "🎉 All answers are correct!";
      nextBtn.style.display = "inline-block";
    } else {
      statusDiv.textContent = `Some answers are incorrect. Please check your answers.`;
    }
  });

  window.finishPage = function() {
    let elapsed = Date.now() - pageStart;
    let pageTimes = JSON.parse(localStorage.getItem("pageTimes")) || {};
    pageTimes["page6"] = elapsed;
    localStorage.setItem("pageTimes", JSON.stringify(pageTimes));
    window.location.href = "summary.html";
  };
});
