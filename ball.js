async function rollBall(maxNumber) {

  const numOfBall = Number(document.getElementById("numOfBall").value);
  const ballResult = document.getElementById("ballResult");
  const ballImages = document.getElementById("ballImages");

  const values = [];

  ballResult.textContent = "";
  ballImages.innerHTML = "";


  if (numOfBall > 7 || numOfBall <= 0) {
    alert("Du kan velge maksimalt 7 tall.");
    return;
  }


  while (values.length < numOfBall) {

    const value = Math.floor(Math.random() * maxNumber) + 1;

    if (!values.includes(value)) {

      values.push(value);

      ballResult.textContent = `Ball : ${values.join(" - ")}`;

      ballImages.innerHTML +=
        `<img src="ball_images/${value}.png" alt="Ball ${value}">`;

      if (values.length < numOfBall) {
        await new Promise(resolve => setTimeout(resolve, 800));
      }
    }
  }
}

//------------------------------------ enter knappen --------------------------------------

const inputBall = document.getElementById("numOfBall");

if (inputBall) {
  inputBall.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      rollBall(48); // Bare for vikingo Tipping
    }
  });
}

