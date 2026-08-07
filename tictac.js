//------------------------------------ vise Tv message ----------------------------------------

/* function showTvMessage(event) {
  event.preventDefault();

  Swal.fire({
    title: "Velkommen til Mazloum online-TV",
    text: "Arabiske / Norske kanaler",
    width:400,
    imageUrl: "../image/mazlogo.png",
    imageWidth: 200,
    imageHeight: 200,
    imageAlt: "TV"
  }).then(() => {
    window.location.href = "../tv/tv.html";
  });
} */

//---------------------------------- Toggle meny -----------------------------------------------------

function toggleMenu() {
  document.getElementById("menu").classList.toggle("show");
}

//---------------------------------- Spill -----------------------------------------------------


const celler = document.querySelectorAll(".celle");
const status = document.getElementById("status");

const mennesker = "X";
const computer = "O";

const winningCombinations = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

let spillOver = false;

celler.forEach(celle => {
  celle.addEventListener("click", menneskeligFlytt);
});

function menneskeligFlytt() {
  if (spillOver || this.textContent !== "") return;

  this.textContent = mennesker;

  if (checkWinner(mennesker)) {
    status.textContent = "Du vinner !";
    spillOver = true;
    return;
  }

  if (isDraw()) {
    status.textContent = "Tegne !";
    spillOver = true;
    return;
  }

  status.textContent = "Datamaskinen tenker...";

  setTimeout(computerMove, 500);
}

function findWinningMove(player) {
  for (const combo of winningCombinations) {
    const values = combo.map(i => celler[i].textContent);

    const playerCount = values.filter(v => v === player).length;
    const emptyCount = values.filter(v => v === "").length;

    if (playerCount === 2 && emptyCount === 1) {
      return combo[values.indexOf("")];
    }
  }

  return null;
}


function computerMove() {
  const emptyCells = [...celler].filter(
    celle => celle.textContent === ""
  );

  if (emptyCells.length === 0) return;

  let move = findWinningMove(computer);

  if (move === null) {
    move = findWinningMove(mennesker);
  }

  if (move !== null) {
    celler[move].textContent = computer;
  } else {
    const randomCell =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];

    randomCell.textContent = computer;
  }

  if (checkWinner(computer)) {
    status.textContent = "Datamaskinen vinner !";
    spillOver = true;
    return;
  }

  if (isDraw()) {
    status.textContent = "Tegne !";
    spillOver = true;
    return;
  }

  status.textContent = "Din tur";
}



function checkWinner(player) {
  for (const combo of winningCombinations) {
    if (combo.every(index => celler[index].textContent === player)) {

      combo.forEach(index => {
        celler[index].style.backgroundColor = "lightgreen";
      });

      return true;
    }
  }

  return false;
}

function isDraw() {
  return [...celler].every(celle =>
    celle.textContent !== ""
  );
}
document.getElementById("restart").onclick = () => {
  celler.forEach(celle => {
    celle.textContent = "";
    celle.style.backgroundColor = "";
  });

  spillOver = false;
  status.textContent = "Din tur";
};