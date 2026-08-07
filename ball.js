async function rollBall(maxNumber) { // maxNumber er det største tallet som kan trekkes.(lotto :34 viking : 48)


  const antallBall = Number(document.getElementById("antallBall").value);// Avlesing av antall påkrevde baller.
  const ballResultat = document.getElementById("ballResultat"); // For å vise de endelige tallene.
  const ballBilder = document.getElementById("ballBilder"); // For å se bilder av ballene

  const verdier = []; // Opprette en array med tall, (De uttrukne tallene vil bli lagret i den.)


  ballResultat.textContent = ""; // Fjern tidligere resultater.
  ballBilder.innerHTML = "";


  if (antallBall <= 0 || antallBall > 7) {
    /* alert("Du kan velge maksimalt 7 tall."); */ // Kontroll av antall baller.

      Swal.fire({
      title: "Feil!",
      width:300,
      text: "Du kan velge maksimalt 7 tall.",
      icon: "error"
      });
    return;
  }

  //--------------------------------- Tilfeldig trekning --------------------------------------------------------------

  while (verdier.length < antallBall) { // Tilfeldig trekning ( Løkken fortsetter helt til antallet trukne sifre tilsvarer det påkrevde antallet.)

    const verdi = Math.floor(Math.random() * maxNumber) + 1; // Generer et tilfeldig tall. (avhenging av maxNumber)

  //--------------------------------- Forebygging av duplisering -------------------------------------------------------

    if (!verdier.includes(verdi)) { // Forebygging av duplisering (ikke gjenta den samme ballen)

      verdier.push(verdi); // Legge til tallet i array

      ballBilder.innerHTML +=
        `<img src="ball_images/${verdi}.png" alt="Ball ${verdi}" class="ball">`; // Vis bilde av ballen.

//-------------------------------------- Forsinkelse mellom baller -------------------------------------------------------

      if (verdier.length < antallBall) {
        await new Promise(resolve => setTimeout(resolve, 650)); // Forsinkelse mellom baller.
      }
    }
  }


//------------------------------------ Sortering av tallene etter trekningen ----------------------------------------

  verdier.sort((a, b) => a - b);

  ballResultat.textContent = `Tall : ${verdier.join(" - ")}`;
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

