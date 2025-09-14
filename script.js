function startBook() {
  let name = document.getElementById("username").value.trim();

  if (!name) {
    alert("Please enter your name.");
    return;
  }

  // Store name and start time
  localStorage.setItem("username", name);
  localStorage.setItem("startTime", Date.now());

  // Reset any old page times
  localStorage.setItem("pageTimes", JSON.stringify({}));

  // Go to first page
  window.location.href = "page1.html";
}

// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  let pageStart = Date.now();
  let foundCount = 0;
  const totalObjects = 5;

  const container = document.getElementById("gameContainer");
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  const objWidth = 40;
  const objHeight = 40;

  const placedPositions = []; // store positions to avoid overlap

  function isOverlapping(x, y) {
    for (let pos of placedPositions) {
      const dx = pos.x - x;
      const dy = pos.y - y;
      if (Math.abs(dx) < objWidth && Math.abs(dy) < objHeight) {
        return true;
      }
    }
    return false;
  }

  // Position each object randomly without overlapping
  document.querySelectorAll(".object").forEach(obj => {
    let x, y;
    let attempts = 0;
    do {
      x = Math.floor(Math.random() * (containerWidth - objWidth));
      y = Math.floor(Math.random() * (containerHeight - objHeight));
      attempts++;
    } while (isOverlapping(x, y) && attempts < 100);

    placedPositions.push({x, y});
    obj.style.left = x + "px";
    obj.style.top = y + "px";

    // Click handler
    obj.addEventListener("click", function() {
      if (!this.classList.contains("found")) {
        this.classList.add("found");
        foundCount++;
        document.getElementById("status").textContent = `✅ Found ${foundCount} of ${totalObjects} objects!`;
        if (foundCount === totalObjects) {
          document.getElementById("status").textContent = "🎉 All objects found!";
          document.getElementById("nextBtn").style.display = "inline-block";
        }
      }
    });
  });

  // Make finishPage accessible to HTML button
  window.finishPage = function() {
    let elapsed = Date.now() - pageStart;
    let pageTimes = JSON.parse(localStorage.getItem("pageTimes")) || {};
    pageTimes["page2"] = elapsed;
    localStorage.setItem("pageTimes", JSON.stringify(pageTimes));
    window.location.href = "page3.html";
  };
});
