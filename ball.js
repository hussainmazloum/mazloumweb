async function rollBall(maxNumber) {

  const numOfBall = Number(document.getElementById("numOfBall").value);
  const ballResult = document.getElementById("ballResult");
  const ballImages = document.getElementById("ballImages");

  const values = [];

  ballResult.textContent = "";
  ballImages.innerHTML = "";


  if (numOfBall <= 0 || numOfBall > 7) {
    alert("Du kan velge maksimalt 7 tall.");
    return;
  }


  while (values.length < numOfBall) {

    const value = Math.floor(Math.random() * maxNumber) + 1;

    if (!values.includes(value)) {

      values.push(value);

      ballImages.innerHTML +=
        `<img src="ball_images/${value}.png" alt="Ball ${value}" class="ball">`;

      if (values.length < numOfBall) {
        await new Promise(resolve => setTimeout(resolve, 600));
      }
    }
  }


// Sortering av tallene etter trekningen
  values.sort((a, b) => a - b);

  ballResult.textContent = `Tall : ${values.join(" - ")}`;
}


// Enter-tasten fungerer avhengig av siden.
const inputBall = document.getElementById("numOfBall");

if (inputBall) {
  inputBall.addEventListener("keydown", function(e) {

    if (e.key === "Enter") {

      if (location.pathname.includes("vikingo")) {
        rollBall(48);   // Vikinglotto
      } 
      else {
        rollBall(34);   // Lotto
      }

    }
  });
}

//------------------------------------ enter knappen --------------------------------------

const lottoInputBall = document.getElementById("numOfBall");

