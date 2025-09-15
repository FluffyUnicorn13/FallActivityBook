// script.js
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
