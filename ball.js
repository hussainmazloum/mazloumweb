const verdier = [];

// -----------------------------------------
// 6 av 48
// -----------------------------------------

async function rollBall(maxNumber) {

  const antallBall = Number(
    document.getElementById("antallBall").value
  );

  const ballResultat = document.getElementById("ballResultat");
  const ballBilder = document.getElementById("ballBilder");

  ballResultat.textContent = "";
  ballBilder.innerHTML = "";

  // Viking-ball finnes bare på Vikinglotto-siden
  const vikingBallElement = document.getElementById("vikingBall");

  if (vikingBallElement) {
    vikingBallElement.innerHTML = "";
  }

  /* const verdier = []; */
  verdier.length = 0; // Tøm tidligere tall

  if (antallBall <= 0 || antallBall > 7) {

    Swal.fire({
      title: "Advarsel!",
      width: 300,
      text: "Du kan velge maksimalt 7 tall.",
      icon: "warning"
    });

    return;
  }

  while (verdier.length < antallBall) {

    const value =
      Math.floor(Math.random() * maxNumber) + 1;

    if (!verdier.includes(value)) {

      verdier.push(value);

      ballBilder.innerHTML += `
        <img src="ball_images/${value}.png"
             alt="Ball ${value}"
             class="ball">
      `;

      await new Promise(resolve =>
        setTimeout(resolve, 650)
      );
    }
  }

  verdier.sort((a, b) => a - b);

  ballResultat.textContent =
    `Tall : ${verdier.join(" - ")}`;
}


// -----------------------------------------
// 1 av 5 Viking-ball
// -----------------------------------------

function rollVikingTall() {
  const element = document.getElementById("vikingBall");

  const vikingTall = Math.floor(Math.random() * 5) + 1;

  element.innerHTML = ` Vikingotall er :
    <img src="ball_images/${vikingTall}.png"
         alt="Vikingtall ${vikingTall}"
         class="ball">
  `;
}



//------------------------------------- Enter-tasten fungerer avhengig av siden.-------------------------------------

const inputBall = document.getElementById("antallBall"); // Hent inntastingsfeltet.

if (inputBall) { // Det verifiserer at elementet finnes på siden, for å forhindre en JavaScript-feil.
  inputBall.addEventListener("keydown", function(e) { // Det venter på at en tast trykkes i inndatafeltet.

    if (e.key === "Enter") { // Det er bekreftet at tasten som ble trykket, er Enter.

      if (location.pathname.includes("vikingo")) { // Sjekker navnet på gjeldende side.
        rollBall(48);   // Vikingo.html
      } 
      else {
        rollBall(34);   // Lotto.html
      }

    }
  });
}

//------------------------------------ enter knappen lotto --------------------------------------

const lottoInputBall = document.getElementById("antallBall");

