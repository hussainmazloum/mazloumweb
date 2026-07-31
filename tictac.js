const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");

const human = "X";
const computer = "O";

const winningCombinations = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

let gameOver = false;

cells.forEach(cell => {
  cell.addEventListener("click", humanMove);
});

function humanMove() {
  if (gameOver || this.textContent !== "") return;

  this.textContent = human;

  if (checkWinner(human)) {
    status.textContent = "Du vinner !";
    gameOver = true;
    return;
  }

  if (isDraw()) {
    status.textContent = "Tegne !";
    gameOver = true;
    return;
  }

  status.textContent = "Datamaskinen tenker...";

  setTimeout(computerMove, 500);
}

function findWinningMove(player) {
  for (const combo of winningCombinations) {
    const values = combo.map(i => cells[i].textContent);

    const playerCount = values.filter(v => v === player).length;
    const emptyCount = values.filter(v => v === "").length;

    if (playerCount === 2 && emptyCount === 1) {
      return combo[values.indexOf("")];
    }
  }

  return null;
}


function computerMove() {
  const emptyCells = [...cells].filter(
    cell => cell.textContent === ""
  );

  if (emptyCells.length === 0) return;

  let move = findWinningMove(computer);

  if (move === null) {
    move = findWinningMove(human);
  }

  if (move !== null) {
    cells[move].textContent = computer;
  } else {
    const randomCell =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];

    randomCell.textContent = computer;
  }

  if (checkWinner(computer)) {
    status.textContent = "Datamaskinen vinner !";
    gameOver = true;
    return;
  }

  if (isDraw()) {
    status.textContent = "Tegne !";
    gameOver = true;
    return;
  }

  status.textContent = "Din tur";
}



function checkWinner(player) {
  for (const combo of winningCombinations) {
    if (combo.every(index => cells[index].textContent === player)) {

      combo.forEach(index => {
        cells[index].style.backgroundColor = "lightgreen";
      });

      return true;
    }
  }

  return false;
}

function isDraw() {
  return [...cells].every(cell =>
    cell.textContent !== ""
  );
}
document.getElementById("restart").onclick = () => {
  cells.forEach(cell => {
    cell.textContent = "";
    cell.style.backgroundColor = "";
  });

  gameOver = false;
  status.textContent = "Din tur";
};