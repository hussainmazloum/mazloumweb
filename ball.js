async function rollBall() {

  const numOfBall = Number(document.getElementById("numOfBall").value);
  const ballResult = document.getElementById("ballResult");
  const ballImages = document.getElementById("ballImages");

  const values = [];

  ballResult.textContent = "";
  ballImages.innerHTML = "";

  if (numOfBall > 7 || numOfBall <= 0) {
    alert(
      "Vikingolotto trekker 6 hovedtall fra 48. Du kan velge maksimalt 7 tall."
    );
    return;
  }


  while (values.length < numOfBall) {

    const value = Math.floor(Math.random() * 48) + 1;

    if (!values.includes(value)) {

      values.push(value);

// Viser den nåværende ballen
      ballResult.textContent = `Ball : ${values.join(" - ")}`;

      ballImages.innerHTML += 
        `<img src="ball_images/${value}.png" alt="Ball ${value}">`;

// Vent et sekund før neste ball
      await new Promise(resolve => setTimeout(resolve, 800));
    }
  }
}

//------------------------------------ enter knappen --------------------------------------

document.getElementById("numOfBall").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    rollBall();
  }
});
