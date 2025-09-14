document.addEventListener("DOMContentLoaded", () => {
  const name = localStorage.getItem("username") || "Player";
  const pageTimes = JSON.parse(localStorage.getItem("pageTimes")) || {};
  const page3WordsFound = JSON.parse(localStorage.getItem("page3WordsFound")) || 0;

  // Greeting
  const greeting = document.getElementById("greeting");
  greeting.textContent = `Congratulations, ${name}!`;

  // Completion date and time
  const completionTime = document.getElementById("completionTime");
  const now = new Date();
  completionTime.textContent = `Completed on: ${now.toLocaleDateString()} at ${now.toLocaleTimeString()}`;

  // Results
  const resultsDiv = document.getElementById("results");
  let totalTime = 0;
  let resultsHTML = "<ul>";

  for (let i = 1; i <= 6; i++) {
    const pageKey = "page" + i;
    const timeMs = pageTimes[pageKey] || 0;
    totalTime += timeMs;
    const timeSec = Math.floor(timeMs / 1000);
    resultsHTML += `<li>Page ${i}: ${timeSec} seconds</li>`;
  }

  resultsHTML += `<li>Words found on Page 3: ${page3WordsFound}</li>`;
  resultsHTML += `<li>Total time: ${Math.floor(totalTime / 1000)} seconds</li>`;
  resultsHTML += "</ul>";

  resultsDiv.innerHTML = resultsHTML;

  // Restart button
  document.getElementById("restartBtn").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "index.html";
  });
});
