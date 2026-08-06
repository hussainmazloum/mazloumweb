async function rollBall(maxNumber) { // maxNumber er det største tallet som kan trekkes.(lotto :34 viking : 48)


  const antallBall = Number(document.getElementById("antallBall").value);// Avlesing av antall påkrevde baller.
  const ballResultat = document.getElementById("ballResultat"); // For å vise de endelige tallene.
  const ballBilder = document.getElementById("ballBilder"); // For å se bilder av ballene

  const values = []; // Opprette en array med tall, (De uttrukne tallene vil bli lagret i den.)


  ballResultat.textContent = ""; // Fjern tidligere resultater.
  ballBilder.innerHTML = "";


  if (antallBall <= 0 || antallBall > 7) {
    alert("Du kan velge maksimalt 7 tall."); // Kontroll av antall baller.
    return;
  }

  //--------------------------------- Tilfeldig trekning --------------------------------------------------------------

  while (values.length < antallBall) { // Tilfeldig trekning ( Løkken fortsetter helt til antallet trukne sifre tilsvarer det påkrevde antallet.)

    const value = Math.floor(Math.random() * maxNumber) + 1; // Generer et tilfeldig tall. (avhenging av maxNumber)

  //--------------------------------- Forebygging av duplisering -------------------------------------------------------

    if (!values.includes(value)) { // Forebygging av duplisering (منع التكرار)

      values.push(value); // Legge til tallet i array

      ballBilder.innerHTML +=
        `<img src="ball_images/${value}.png" alt="Ball ${value}" class="ball">`; // Vis bilde av ballen.

//-------------------------------------- Forsinkelse mellom baller -------------------------------------------------------

      if (values.length < antallBall) {
        await new Promise(resolve => setTimeout(resolve, 650)); // Forsinkelse mellom baller.
      }
    }
  }


//------------------------------------ Sortering av tallene etter trekningen ----------------------------------------

  values.sort((a, b) => a - b);

  ballResultat.textContent = `Tall : ${values.join(" - ")}`;
}


//------------------------------------- Enter-tasten fungerer avhengig av siden.-------------------------------------

const inputBall = document.getElementById("antallBall"); // Hent inntastingsfeltet.

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

const lottoInputBall = document.getElementById("antallBall");

