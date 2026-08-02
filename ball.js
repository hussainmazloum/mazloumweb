function rollBall() {

  const numOfBall = Number(document.getElementById("numOfBall").value);
  const ballResult = document.getElementById("ballResult");
  const ballImages = document.getElementById("ballImages");

  const values = [];
  const images = [];


  if (numOfBall > 7 || numOfBall <= 0) {
    alert(
      "Vikinglotto trekker 6 hovedtall fra 48. Du kan velge maksimalt 7 tall."
    );
    return;
  }


  while (values.length < numOfBall) {

    const value = Math.floor(Math.random() * 48) + 1;

    if (!values.includes(value)) {
      values.push(value);
      images.push(
        `<img src="ball_images/${value}.png" alt="Ball ${value}">`
      );
    }
  }


  ballResult.textContent = `Ball : ${values.join(" - ")}`;
  ballImages.innerHTML = images.join("");
}



document.getElementById("numOfBall").addEventListener("keydown", function(e){

  if(e.key === "Enter"){
    rollBall();
  }

});

//------------------------------------ enter knappen --------------------------------------

document.getElementById("numOfBall").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    rollBall();
  }
});
