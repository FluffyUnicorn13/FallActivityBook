document.addEventListener("DOMContentLoaded", () => {
  const words = ["AUTUMN","LEAVES","PUMPKIN","HARVEST","ACORN","COOL","ORANGE","VIBES","FALL"];
  const gridSize = 12;
  const gridContainer = document.getElementById("word-search");
  const selected = [];
  let foundWords = [];

  // Create empty grid
  const grid = Array.from({length:gridSize}, () => Array(gridSize).fill(''));

  // Place words horizontally or vertically
  words.forEach(word => {
    let placed = false;
    while(!placed){
      const horizontal = Math.random() < 0.5;
      const row = Math.floor(Math.random()*gridSize);
      const col = Math.floor(Math.random()*(gridSize - word.length));
      let canPlace = true;
      for(let i=0;i<word.length;i++){
        const r = horizontal ? row : row + i;
        const c = horizontal ? col + i : col;
        if(r>=gridSize || c>=gridSize || grid[r][c] !== '') { canPlace=false; break;}
      }
      if(canPlace){
        for(let i=0;i<word.length;i++){
          const r = horizontal ? row : row + i;
          const c = horizontal ? col + i : col;
          grid[r][c] = word[i];
        }
        placed = true;
      }
    }
  });

  // Fill empty spaces
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for(let r=0;r<gridSize;r++){
    for(let c=0;c<gridSize;c++){
      if(grid[r][c]==='') grid[r][c]=letters[Math.floor(Math.random()*letters.length)];
    }
  }

  // Render grid
  grid.forEach((row,rIdx)=>{
    const rowDiv=document.createElement("div");
    rowDiv.classList.add("row");
    row.forEach((letter,cIdx)=>{
      const span=document.createElement("span");
      span.textContent=letter;
      span.dataset.row=rIdx;
      span.dataset.col=cIdx;

      // Drag selection
      span.addEventListener("mousedown", ()=>{
        clearSelection();
        span.classList.add("selected");
        selected.push(span);
      });

      span.addEventListener("mouseenter", (e)=>{
        if(e.buttons===1){ // mouse held down
          const last = selected[selected.length-1];
          if(last.dataset.row === span.dataset.row || last.dataset.col === span.dataset.col){
            if(!span.classList.contains("selected")){
              span.classList.add("selected");
              selected.push(span);
            }
          }
        }
      });

      rowDiv.appendChild(span);
    });
    gridContainer.appendChild(rowDiv);
  });

  // Mouse up to check word
  document.addEventListener("mouseup", checkWord);

  function clearSelection(){
    selected.forEach(s=>s.classList.remove("selected"));
    selected.length = 0;
  }

  function checkWord(){
    if(selected.length<2) return;
    const wordStr = selected.map(s=>s.textContent).join('');
    const revStr = selected.map(s=>s.textContent).reverse().join('');
    for(let word of words){
      if(foundWords.includes(word)) continue;
      if(wordStr===word || revStr===word){
        selected.forEach(s=>{
          s.classList.remove("selected");
          s.classList.add("found");
        });
        foundWords.push(word);

// Strike-through word in word list and add a checkmark
const listItems = document.querySelectorAll("#word-list li");
listItems.forEach(li => {
  if (li.textContent.toUpperCase() === word) {
    li.style.textDecoration = "line-through";
    li.style.color = "#555";       // muted gray
    li.textContent = "✅ " + li.textContent; // add checkmark
  }
});


        break;
      }
    }
    clearSelection();
    if(foundWords.length===words.length){
      document.getElementById("nextBtn").style.display="inline-block";
    }
  }

  // Finish page
  window.finishPage=function(){
    savePageTime("page1");
    window.location.href="page2.html";
  };
});
