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

  let totaltBetalt = 0;

  for (let i = 1; i <= antallManed; i++) {
    let renteBetaling = gjenværendeSaldo * manedRente;
    let hovedstolbetaling = terminbelop - renteBetaling;
    gjenværendeSaldo -= hovedstolbetaling;

    totaltBetalt += terminbelop;

    tBody.innerHTML += `<tr>
             <tr data-betalt="${totaltBetalt}">           
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
      `Lånebeløp: <span class="red">${laan.toLocaleString("nb-NO")} kr</span> med rente <span class="red">${arRente}% </span> <br> over <span class="red"> ${ar}</span> år (<span class="red">${antallManed} måneder</span>).`;
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

  const row = tBody.rows[i];

  // تجاهل الصفوف الفارغة
  if (row.cells.length === 0) continue;

  const nummer = row.cells[0].textContent
    .trim()
    .toLowerCase();

  if (nummer.includes(sok)) {
    row.classList.add("search-row");

    if (!funnet) {
      scrollToElement(row, 500);
    }

    funnet = true;
  }
}

  if (!funnet) {
    alert("Ingen månedsnummer ble funnet.");
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

//---------------------------------------------------- Hover infoBoks ----------------------------------------

const infoBox = document.getElementById("infoBox");


tBody.addEventListener("mouseover", (e) => {

  const rad = e.target.closest("tr");

  if (!rad) return;


  const betalt = Number(rad.dataset.betalt);


  infoBox.innerHTML = `
    <strong>${rad.cells[0].textContent}</strong><br>
    Betalt til nå:
    ${betalt.toLocaleString("nb-NO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })} kr
    <br>
    Gjenstående gjeld:
    ${rad.cells[5].textContent}
  `;


  infoBox.style.display = "block";

});


tBody.addEventListener("mousemove", (e)=>{

  infoBox.style.left = (e.clientX + 15) + "px";
  infoBox.style.top = (e.clientY + 15) + "px";

});


tBody.addEventListener("mouseleave", ()=>{

  infoBox.style.display = "none";

});

