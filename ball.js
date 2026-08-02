function rollBall() {
  const numOfBall = document.getElementById("numOfBall").value;
  const ballResult = document.getElementById("ballResult");
  const ballImages = document.getElementById("ballImages");
  const values = [];
  const images = [];

  while (values.length < numOfBall) {
    const value = Math.floor(Math.random() * 48) + 1; // 1-48
    if (values.indexOf(value) === -1) {
      values.push(value);
      images.push(`<img src="ball_images/${value}.png" alt="Ball ${value}">`);
    }
    
    if (numOfBall > 7) {
      alert(
        `"Vikinglotto er et lotterispill i samarbeid mellom ti land, hvor det trekkes 6 av 48 hovedtall og 1 av 5 vikingtall .\n Det trekkes også ett tilleggstall blant de 48. Du nå trekket ${numOfBall} og det tallet er mer enn 7 hovedtall."`,
      );
      return;
    }

    ballResult.textContent = `Ball : ${values.join(" - ")}`;
    ballImages.innerHTML = images.join("");
  }

  /*  for( let i = 0; i < numOfBall; i++){
        const value = Math.floor(Math.random()*6) +1;
        values.push(value); */
}
