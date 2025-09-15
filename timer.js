// --- Persistent Timer Script --- //
let pageStartTime = Date.now();

// Update timers every second
setInterval(() => {
  const now = Date.now();
  
  // Page elapsed time
  let pageElapsed = now - pageStartTime;
  document.getElementById("pageTimer").textContent = formatTime(pageElapsed);

  // Total elapsed time (using localStorage)
  let bookStartTime = localStorage.getItem("startTime");
  if (bookStartTime) {
    let totalElapsed = now - parseInt(bookStartTime);
    document.getElementById("totalTimer").textContent = formatTime(totalElapsed);
  }
}, 1000);

// Helper to format milliseconds to MM:SS
function formatTime(ms) {
  let totalSeconds = Math.floor(ms / 1000);
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2,'0')}`;
}

// Call this function when the page is finished to save page time
function savePageTime(pageName) {
  let pageElapsed = Date.now() - pageStartTime;
  let pageTimes = JSON.parse(localStorage.getItem("pageTimes") || "{}");
  pageTimes[pageName] = pageElapsed;
  localStorage.setItem("pageTimes", JSON.stringify(pageTimes));
}
