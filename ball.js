async function rollBall(maxNumber) { // maxNumber er det største tallet som kan trekkes.(lotto :34 viking : 48)


  const numOfBall = Number(document.getElementById("numOfBall").value);// Avlesing av antall påkrevde baller.
  const ballResult = document.getElementById("ballResult"); // For å vise de endelige tallene.
  const ballImages = document.getElementById("ballImages"); // For å se bilder av ballene

  const values = []; // Opprette en array med tall, (De uttrukne tallene vil bli lagret i den.)


  ballResult.textContent = ""; // Fjern tidligere resultater.
  ballImages.innerHTML = "";


  if (numOfBall <= 0 || numOfBall > 7) {
    alert("Du kan velge maksimalt 7 tall."); // Kontroll av antall baller.
    return;
  }


  while (values.length < numOfBall) { // Tilfeldig trekning ( Løkken fortsetter helt til antallet trukne sifre tilsvarer det påkrevde antallet.)

    const value = Math.floor(Math.random() * maxNumber) + 1; // Generer et tilfeldig tall. (avhenging av maxNumber)

    if (!values.includes(value)) { // Forebygging av duplisering (منع التكرار)

      values.push(value); // Legge til tallet i array

      ballImages.innerHTML +=
        `<img src="ball_images/${value}.png" alt="Ball ${value}" class="ball">`; // Vis bilde av ballen.

      if (values.length < numOfBall) {
        await new Promise(resolve => setTimeout(resolve, 650)); // Forsinkelse mellom baller.
      }
    }
  }


// Sortering av tallene etter trekningen
  values.sort((a, b) => a - b);

  ballResult.textContent = `Tall : ${values.join(" - ")}`;
}


// Enter-tasten fungerer avhengig av siden.
const inputBall = document.getElementById("numOfBall"); // Hent inntastingsfeltet.

if (inputBall) { // Det verifiserer at elementet finnes på siden, for å forhindre en JavaScript-feil.
  inputBall.addEventListener("keydown", function(e) { // Det venter på at en tast trykkes i inndatafeltet.

    if (e.key === "Enter") { // Det er bekreftet at tasten som ble trykket, er Enter.

      if (location.pathname.includes("vikingo")) { // Sjekker navnet på gjeldende side.
        rollBall(48);   // Vikinglotto
      } 
      else {
        rollBall(34);   // Lotto
      }

    }
  });
}

//------------------------------------ enter knappen lotto --------------------------------------

const lottoInputBall = document.getElementById("numOfBall");

