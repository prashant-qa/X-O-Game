let board = ["", "", "", "", "", "", "", "", ""];
let playerSymbol = "";
let computerSymbol = "";
let gameActive = false;

function setPlayer(symbol) {
  playerSymbol = symbol;
  computerSymbol = symbol === "X" ? "O" : "X";
  document.querySelector(".selection").style.display = "none";
  gameActive = true;
}

function makeMove(index) {
  if (!gameActive || board[index] !== "") return;

  board[index] = playerSymbol;
  renderBoard();

  if (checkWinner(playerSymbol)) {
    alert("🎉 Congratulations! You win!");
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== "")) {
    alert("It's a draw!");
    gameActive = false;
    return;
  }

  setTimeout(() => {
    computerMove();
    if (checkWinner(computerSymbol)) {
      alert("😞 Computer wins!");
      gameActive = false;
    }
  }, 500);
}

function computerMove() {
  let emptyIndexes = board.map((val, idx) => val === "" ? idx : null).filter(v => v !== null);
  if (emptyIndexes.length === 0) return;
  let choice = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
  board[choice] = computerSymbol;
  renderBoard();
}

function renderBoard() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell, idx) => {
    cell.textContent = board[idx];
  });
}

function checkWinner(symbol) {
  const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winCombos.some(combo => combo.every(i => board[i] === symbol));
}
