document.addEventListener("DOMContentLoaded", () => {
  const words = ["AUTUMN","LEAVES","PUMPKIN","HARVEST","ACORN","COOL","ORANGE","VIBES","FALL"];
  const gridSize = 12;
  const gridContainer = document.getElementById("word-search");
  const selectedSpans = [];
  let foundWords = [];

  // Create empty grid
  let grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(""));

  // Place words randomly (horiz/vert)
  words.forEach(word => {
    let placed = false;
    while (!placed) {
      const horizontal = Math.random() < 0.5;
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * (gridSize - word.length));
      let canPlace = true;

      for (let i = 0; i < word.length; i++) {
        let r = horizontal ? row : row + i;
        let c = horizontal ? col + i : col;
        if (r >= gridSize || c >= gridSize || grid[r][c] !== "") {
          canPlace = false;
          break;
        }
      }

      if (canPlace) {
        for (let i = 0; i < word.length; i++) {
          let r = horizontal ? row : row + i;
          let c = horizontal ? col + i : col;
          grid[r][c] = word[i];
        }
        placed = true;
      }
    }
  });

  // Fill remaining spaces with random letters
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (grid[r][c] === "") {
        grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }

  // Render grid
  grid.forEach((row, rIdx) => {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    row.forEach((letter, cIdx) => {
      const span = document.createElement("span");
      span.textContent = letter;
      span.dataset.row = rIdx;
      span.dataset.col = cIdx;

      // Tap to select
      span.addEventListener("click", () => {
        if (!span.classList.contains("found")) {
          span.classList.toggle("selected");
          if (span.classList.contains("selected")) {
            selectedSpans.push(span);
          } else {
            const index = selectedSpans.indexOf(span);
            if (index > -1) selectedSpans.splice(index, 1);
          }
          checkSelectedWord();
        }
      });

      rowDiv.appendChild(span);
    });
    gridContainer.appendChild(rowDiv);
  });

  // Check if selected word is valid
  function checkSelectedWord() {
    if (selectedSpans.length < 2) return;
    const selectedWord = selectedSpans.map(s => s.textContent).join("");
    const reversedWord = selectedSpans.map(s => s.textContent).reverse().join("");

    for (let word of words) {
      if (foundWords.includes(word)) continue;
      if (selectedWord === word || reversedWord === word) {
        selectedSpans.forEach(s => {
          s.classList.remove("selected");
          s.classList.add("found");
        });
        foundWords.push(word);

        // Cross off word in list
        document.querySelectorAll("#word-list li").forEach(li => {
          if (li.textContent.toUpperCase() === word) {
            li.style.textDecoration = "line-through";
            li.style.color = "gray";
          }
        });

        selectedSpans.length = 0; // clear
        break;
      }
    }

    // Show Next when all found
    if (foundWords.length === words.length) {
      document.getElementById("nextBtn").style.display = "inline-block";
    }
  }

  // Finish page
  window.finishPage = function () {
    savePageTime("page1");
    window.location.href = "page2.html";
  };
});
