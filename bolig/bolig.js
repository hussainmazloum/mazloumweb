let laan;
let arRente;
let ar;

document.getElementById("beregn").onclick = function () {
  laan = Number(document.getElementById("laan").value);
  arRente = Number(document.getElementById("rente").value);
  ar = Number(document.getElementById("ar").value);

  // Validering av inndata (input) :

  if (
    isNaN(laan) ||
    laan <= 0 ||
    isNaN(arRente) ||
    arRente < 0 ||
    isNaN(ar) ||
    ar <= 0
  ) {
    alert(`Vennligst skriv inn gyldige positive tall.`);
    return;
  }

  // Formel for terminbeløp :

  const manedRente = arRente / 100 / 12;
  const antallManed = ar * 12;

  const x = Math.pow(1 + manedRente, antallManed);
  const terminbelop = (laan * x * manedRente) / (x - 1);

  const interest = laan * manedRente;
  const avdrag = terminbelop - interest;
  /*   const rest_gjeld = laan - avdrag;
   */
  document.getElementById("tableHead").style.display = "table-header-group"; // Viser tabelloverskriften (thead) etter at brukeren trykker på knappen.

  let gjenværendeSaldo = laan;

  // Forloop :

  let totalLaan = 0;
  let totalRente = 0;
  totalLaan += terminbelop * antallManed;
  totalRente = totalLaan - laan;

  tBody.innerHTML = "";

  for (let i = 1; i <= antallManed; i++) {
    let renteBetaling = gjenværendeSaldo * manedRente;
    let hovedstolbetaling = terminbelop - renteBetaling;
    gjenværendeSaldo -= hovedstolbetaling;

    tBody.innerHTML += `<tr>
                        
            <td>Måned : ${i}</td>
            <td>${laan.toLocaleString("nb-NO")}</td>
            <td>${terminbelop.toLocaleString("nb-NO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td>${renteBetaling.toLocaleString("nb-NO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td>${hovedstolbetaling.toLocaleString("nb-NO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td>${gjenværendeSaldo.toLocaleString("nb-NO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td> 
          </tr>`;

    // Formel for total lån / total rente / effektive rente :

    let effek_rente = (1 + manedRente) ** 12 - 1;
    let effektive_rente = effek_rente * 100;

    // Vise data

    document.getElementById("result1").innerHTML =
      `Lånebeløp: <span class="red">${laan.toLocaleString("nb-NO")} kr</span> med rente <span class="red">${arRente}% </span> over ${ar} år (<span class="red">${antallManed} måneder</span>).`;
    /* document.getElementById("result1").innerHTML =`Lånebeløp: <span class="red">${laan} kr</span> over  ${ar} år (<span class="red"> ${antallManed} måneder.)</span>`; */

    document.getElementById("result2").innerHTML =
      `Total rentekostnad: <span class="red"> ${totalRente.toLocaleString("nb-NO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} kr </span>`;
    /* document.getElementById("result2").innerHTML =`Total rente kostnad :<span class="red"> ${totalRente.toFixed(2)} Kr.</span>`;*/

    document.getElementById("result3").innerHTML =
      `Total lån inkludert rente :<span class="red"> ${totalLaan.toLocaleString("nb-NO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} kr </span>`;
    document.getElementById("result4").innerHTML =
      `Effektive rente :<span class="red"> ${effektive_rente.toFixed(2)} %</span>`;

    document.getElementById("result").style.background = "white";
  }

  // Stanse faksjonen for (onclick)
  this.disabled = true;
  this.innerHTML = "Beregnet";

  ["laan", "rente", "ar"].forEach((id) => {
    document.getElementById(id).value = "";
  });
};

//Fanksjoner for fjerne og lukke knapper
document.getElementById("fjerne").onclick = () => {
  if (confirm(`Er du sikker ! \n Data skal slettes . `))
    window.location.reload();
};
document.getElementById("lukke").onclick = () => {
  if (confirm(`Er du sikker ! \n siden skal lukkes .`))
    window.top.location.href = "../index.html";
};

// ----------------------------------------------------------------------------------------------------------------------------------------------------------
const tBody = document.getElementById("tBody");

function sokMåned() {
  const input = document.getElementById("sokManed");
  const sok = input.value.trim().toLowerCase();

  if (sok === "") {
    alert("Skriv inn månedsnummer.");
    return;
  }

  let funnet = false;

  // Fjern det forrige valget
  tBody
    .querySelectorAll("tr")
    .forEach((row) => row.classList.remove("search-row"));

  for (let i = 0; i < tBody.rows.length; i++) {
    const nummer = tBody.rows[i].cells[0].textContent.trim().toLowerCase();

    if (nummer.includes(sok)) {
      tBody.rows[i].classList.add("search-row");

      if (!funnet) {
        scrollToElement(tBody.rows[i], 500);
      }

      funnet = true;
    }
  }

  if (!funnet) {
    alert("Ingen navn ble funnet.");
  }

  input.value = "";
}

function scrollToElement(element, duration) {
  element.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

// ----------------------------------------------- Klikk på søkeknappen ved å trykke Enter. -------------------------------------------------------------

document.getElementById("sokManed").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    sokMåned();
  }
});

/*  console.log(`Måned :  ${i} 
    Terminbeløp : Kr. ${terminbelop.toFixed(2)}, 
    Rente       : Kr. ${renteBetaling.toFixed(2)}, 
    Avdrag      : Kr. ${hovedstolbetaling.toFixed(2)}, 
    Restegjeld  : Kr. ${gjenværendeSaldo.toFixed(2)}`); */
