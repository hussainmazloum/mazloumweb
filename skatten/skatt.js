/* function showTvMessage(event) {
  event.preventDefault();

  Swal.fire({
    title: "Velkommen til Mazloum online-TV",
    text: "Arabiske / Norske kanaler",
    width:400,
    imageUrl: "../image/mazlogo.png",
    imageWidth: 200,
    imageHeight: 200,
    imageAlt: "TV"
  }).then(() => {
    window.location.href = "../tv/tv.html";
  });
} */


function toggleMenu() {
  document.getElementById("menu").classList.toggle("show");
}
function toggleTipp(event) {
  event.preventDefault();
  document.getElementById("tippMenu").classList.toggle("show");
}


const tableBody = document.getElementById("tableBody");
const tablekroppen = document.getElementById("tablekroppen");

 let sisteNavn = "";

let radSomRedigeres = null;
let radArligSomRedigeres = null;

function beregneSkatte() {
  const name = document.getElementById("navn");
  const lonn = document.getElementById("lonn");
  const skattesats = document.getElementById("skattesats");
  const tlf = document.getElementById("tlf").value;

 

  const nom = name.value
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

    sisteNavn = nom;
  const lonnVerdi = Number(lonn.value);
  const skattProsent = Number(skattesats.value);

  //--------------------------------------------------------------
 function skatteIntekt(lonn, prosent) {
  return (lonn * prosent) / 100;
}

if (
  isNaN(name) ||
  isNaN(lonnVerdi) ||
  isNaN(skattProsent) ||
  lonnVerdi <= 0 ||
  skattProsent <= 0
) {

Swal.fire({
      title: "Advarsel!",
      width:300,
      text: "Fyll inn gyldige tall.",
      icon: "warning"
      });

  /* alert("Fyll inn gyldige tall."); */
  return;
}

if (skattProsent > 100) {

  Swal.fire({
      title: "Advarsel!",
      width:300,
      text: "Skatt må være mindre enn 100 %",
      icon: "warning"
      });

  /* alert("Skatt må være mindre enn 100 %"); */
  return;
}

const skatten = Math.round(skatteIntekt(lonnVerdi, skattProsent));

// Lønn etter skatt i en vanlig måned
const lonnEtterSkatte = Math.round(lonnVerdi - skatten);

// Årlig skatt: 11 hele måneder + 1 måned halv skatt
const arligSkatt = Math.round((skatten * 11) + (skatten / 2));

// Årsinntekt etter skatt
const arligNetto = Math.round((lonnVerdi * 12) - arligSkatt);

//Årsinntekt før skatt
const arligBrutto = Math.round(lonnVerdi * 12);

  //-------------------------------------------------------------- Å formatere / skrive lønn eller resultat nummer i norsk måte ------

  const formatertArligBrutto = arligBrutto.toLocaleString("nb-NO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const formatertArligNetto = arligNetto.toLocaleString("nb-NO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const formatertSkatt = (-skatten).toLocaleString("nb-NO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const formatertLonn = lonnEtterSkatte.toLocaleString("nb-NO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const formatertArligSkatt = (-arligSkatt).toLocaleString("nb-NO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const formatertPris = lonnVerdi.toLocaleString("nb-NO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  //------------------------------------------------------- Tabel ---------------------------------------------------------------------------

  tableBody.innerHTML += `
<tr>
    <td><span>${nom}</span></td>
    <td><span >${formatertPris} kr</span></td>
    <td><span >${skattProsent} %</span></td>
    <td><span >${formatertSkatt} kr</span></td>
    <td><span >${formatertLonn} kr</span></td>

    <td><span >${tlf}</span></td>
    <td>
    <button class="edit-btn" onclick="redigerRad(this)">
        Rediger
    </button>
        <button class="remove-btn" onclick="slettRad(this)">
            Slette
        </button>
    </td>
</tr>`;

  tablekroppen.innerHTML += `
<tr>
    <td><span>${nom}</span></td>
    <td><span>${formatertPris}<span class="valuta"> kr</span></span></td>
    <td><span>${formatertArligBrutto}<span class="valuta"> kr</span></span></td>
    <td><span>${formatertArligNetto}<span class="valuta"> kr</span></span></td>
    <td><span>${formatertArligSkatt}<span class="valuta"> kr</span></span></td>
</tr>`;

sortere();

//-------------------------------------- Å lage setning som viser antall medlemmer --------------------------------------------------------------------------------------------
const medlem = document.getElementById("medlem");
medlem.innerHTML = `Antall medlemmer:  <span class="svar"> ${tableBody.rows.length}</span>`;


  //------------------------------------------------------- Tøm inputfeltene etter at funksjonen er kjørt ---------------------------------------------------------------------------
  name.value = "";
  lonn.value = "";
  skattesats.value = "";

  document.getElementById("tlf").value = "";
  
  
  document.getElementById("navn").focus(); // muse kommer tilbake til felt navn når den beregner og lage data .
}

//------------------------------------------------------- Lagre data i local storage ---------------------------------------------------------------------------

function lagreData() {
  //Denne funksjonen heter `saveData()`, og formålet med den er å lagre innholdet i de to tabellene i `localStorage`,
  // slik at dataene blir værende etter at siden er lastet inn på nytt.
  if (tableBody.rows.length === 0 && tablekroppen.rows.length === 0) {

    Swal.fire({
      title: "Advarsel!",
      width:300,
      text: "Det finnes ingen informasjon å lagre!",
      icon: "warning"
      });

    /* alert("Det finnes ingen informasjon å lagre!"); */
    return;
  }

  localStorage.setItem("skattTabell", tableBody.innerHTML);
  localStorage.setItem("arligTabell", tablekroppen.innerHTML);

  /* Swal.fire({
      title: "Feil!",
      width:300,
      text: `Data til ${sisteNavn} er lagret!`,
      icon: "error"
      }); */

  /* alert(`Data til ${sisteNavn} er lagret!`); */
}
//-------------------------------------- window onload -----------------------------------
window.onload = function () {
  // Denne koden kjøres når siden lastes inn; dens oppgave er å hente dataene som er lagret i `localStorage`,
  // og gjenopprette dem i de to tabellene.

  const tabell = localStorage.getItem("skattTabell");
  const arlig = localStorage.getItem("arligTabell");

  if (tabell) tableBody.innerHTML = tabell;
  if (arlig) tablekroppen.innerHTML = arlig;

//----------------- Å vise antall medlemmer når siden last ned igjen -----------------------------------------------

 const medlem = document.getElementById("medlem");
medlem.innerHTML = `Antall medlemmer: <span class="svar">${tableBody.rows.length}</span>`;
};
//------------------------------------------------------- Fjerne rad fra tabell i local storage ---------------------------------------------------------------------------

function slettRad(slettbtn) {

  const row = slettbtn.closest("tr");

  const index = Array.from(tableBody.rows).indexOf(row);

  Swal.fire({
    width: 300,
    title: "Er du sikker?",
    text: "Du vil slette denne raden.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#f4a261",
    cancelButtonColor: "rgb(59, 81, 104)",
    confirmButtonText: "Ja, slett!",
    cancelButtonText: "Avbryt"
  }).then((result) => {

    if (result.isConfirmed) {

      if (index !== -1) {

        tableBody.deleteRow(index);
        tablekroppen.deleteRow(index);

        localStorage.setItem("skattTabell", tableBody.innerHTML);
        localStorage.setItem("arligTabell", tablekroppen.innerHTML);

        Swal.fire({
          width: 300,
          title: "Slettet!",
          text: "Raden er fjernet.",
          icon: "success"
        });

      }
    }

  });
}

//------------------------------------------------------- Fjerne data fra local storage ---------------------------------------------------------------------------

function fjerneData() {
  Swal.fire({
    width: 300,
    title: "Er du sikker?",
    text: "Du vil slette alle data i tabellene.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#f4a261",
    cancelButtonColor: "rgb(59, 81, 104)",
    confirmButtonText: "Ja, slett!",
    cancelButtonText: "Avbryt"
  }).then((result) => {
    if (result.isConfirmed) {
      tableBody.innerHTML = "";
      tablekroppen.innerHTML = "";

      localStorage.removeItem("skattTabell");
      localStorage.removeItem("arligTabell");

      Swal.fire({
        width: 300,
        title: "Slettet!",
        text: "Alle data er fjernet.",
        icon: "success"
      });
    }
  });
}

//------------------------------------------------------- lukke siden ---------------------------------------------------------------------------

function lukkSide() {
 Swal.fire({
    width: 300,
    title: "Er du sikker?",
    text: "Du vil forlate siden!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#f4a261",
    cancelButtonColor: "rgb(59, 81, 104)",
    confirmButtonText: "Ja, lukk!",
    cancelButtonText: "Avbryt"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        width: 300,
        title: "Lukket!",
        text: "Du blir sendt til forsiden.",
        icon: "success"
      }).then(() => {
        window.top.location.href = "../index.html";
      });
    }
  });
}

// ------------------------------------------------- søke etter bruttolønn ------------------------------
function sokNavn() {
  const input = document.getElementById("sokNavnInput");
  const sok = input.value.trim().toLowerCase();
  const sokeType = document.getElementById("sokeType").value;

  if (sok === "") {

    Swal.fire({
      title: "Advarsel!",
      width:300,
      text: "Skriv inn et navn eller telefon.",
      icon: "warning"
      });
    /* alert("Skriv inn et navn eller telefon."); */
    return;
  }

  let funnet = false;
  let antallNavneFunnet = 0;

  // Fjern tidligere markeringer
  tableBody
    .querySelectorAll("tr")
    .forEach((row) => row.classList.remove("search-row"));

  tablekroppen
    .querySelectorAll("tr")
    .forEach((row) => row.classList.remove("search-row"));

  for (let i = 0; i < tableBody.rows.length; i++) {
    const fulltNavn = tableBody.rows[i].cells[0].textContent.trim();

    const deler = fulltNavn.split(/\s+/);

    const fornavn = deler[0]?.toLowerCase() || "";
    const etternavn = deler[deler.length - 1]?.toLowerCase() || "";

    const telefon = tableBody.rows[i].cells[5].textContent.trim();

let treff = false;

if (sokeType === "fornavn") {
  treff = fornavn.startsWith(sok);
} else if (sokeType === "etternavn") {
  treff = etternavn.startsWith(sok);
} else if (sokeType === "telefon") {
  treff = telefon.startsWith(sok);
} else {
  treff =
    fulltNavn.toLowerCase().startsWith(sok) ||
    telefon.startsWith(sok);
} 

    if (treff) {
      antallNavneFunnet++;

      tableBody.rows[i].classList.add("search-row");

      if (tablekroppen.rows[i]) {
        tablekroppen.rows[i].classList.add("search-row");
      }
      //--------------------------- scroll bare table ----------------------------------------------------------------------------------------------
      if (!funnet) {
        const container = document.querySelector(".table-container");

        container.scrollTo({
          top: tableBody.rows[i].offsetTop - 40,
          behavior: "smooth",
        });

        funnet = true;
      }
    }
  }

  if (!funnet) {

Swal.fire({
      title: "Feil!",
      width:300,
      text: `Ingen navn eller telefon med "${sok}" ble funnet.`,
      icon: "error"
      });

    /* alert(`Ingen navn med "${sok}" ble funnet.`); */
  } else {

    
Swal.fire({
      title: "Flott!",
      width:300,
      text: `Fant ${antallNavneFunnet} navn med "${sok}".`,
      icon: "success"
      });
   /*  alert(`Fant ${antallNavneFunnet} navn med "${sok}".`); */
  }

  input.value = "";
}

document
  .getElementById("sokNavnInput")
  .addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      sokNavn();
    }
  });


//--------------------------------------------------------------------- sortere ----------------------------------------------------------------------------------

function sortere() {
  const rows1 = Array.from(tableBody.rows);
  const rows2 = Array.from(tablekroppen.rows);

  const arligMap = {};

  rows2.forEach((row) => {
    const navn = row.cells[0].textContent.trim().toLowerCase();
    arligMap[navn] = row;
  });

  rows1.sort((a, b) => {
    const navnA = a.cells[0].textContent.trim();
    const navnB = b.cells[0].textContent.trim();

    const etternavnA = navnA.split(/\s+/).pop().toLowerCase();
    const etternavnB = navnB.split(/\s+/).pop().toLowerCase();

    return etternavnA.localeCompare(etternavnB, "nb-NO");
  });

  tableBody.innerHTML = "";
  tablekroppen.innerHTML = "";

  rows1.forEach((row) => {
    tableBody.appendChild(row);

    const navn = row.cells[0].textContent.trim().toLowerCase();

    if (arligMap[navn]) {
      tablekroppen.appendChild(arligMap[navn]);
    }
  });

  localStorage.setItem("skattTabell", tableBody.innerHTML);
  localStorage.setItem("arligTabell", tablekroppen.innerHTML);

}

//-------------------------------------------------------------------- rediger --------------------------------------------------

function redigerRad(knapp) {
  const rad = knapp.closest("tr");
  const index = Array.from(tableBody.rows).indexOf(rad);

  document.getElementById("navn").value = rad.cells[0].textContent.trim();

  document.getElementById("lonn").value = parseInt(
    rad.cells[1].textContent.replace(/[^\d]/g, ""),
  );

  document.getElementById("skattesats").value = parseInt(
    rad.cells[2].textContent,
  );
  document.getElementById("tlf").value =
  rad.cells[5].textContent.trim();

  radSomRedigeres = rad;
  radArligSomRedigeres = tablekroppen.rows[index];
}

// ------------------------------------------------------------------ lagre endring ------------------------------------------------
function lagreEndring() {
  if (radSomRedigeres === null) {

    Swal.fire({
      title: "Advarsel!",
      width:300,
      text: "Ingen rad er valgt for redigering.",
      icon: "warning"
      });

    /* alert("Ingen rad er valgt for redigering."); */
    return;
  }

  const tlf = document.getElementById("tlf").value;

  const rad = radSomRedigeres;
  const radArlig = radArligSomRedigeres;

  const lonn = Number(document.getElementById("lonn").value);
  const skattesats = Number(document.getElementById("skattesats").value);
  

  if (
    isNaN(lonn) ||
    isNaN(skattesats) ||
    lonn <= 0 ||
    skattesats <= 0
  ) {

    Swal.fire({
      title: "Advarsel!",
      width:300,
      text: "Fyll inn gyldige tall.",
      icon: "warning"
      });

    /* alert("Fyll inn gyldige tall."); */
    return;
  }

  /* if (skattesats > 100) {

    Swal.fire({
      title: "Feil!",
      width:300,
      text: "Skatt må være mindre enn 100 %",
      icon: "error"
      });

      alert("Skatt må være mindre enn 100 %"); 
  return;
} */

  const skatt = Math.round((lonn * skattesats) / 100);
  const netto = Math.round(lonn - skatt);

  // 11 måneder full skatt + 1 måned halv skatt
  const arligSkatt = Math.round(skatt * 11.5);

  // Netto årsinntekt
  const arligNetto = Math.round((lonn * 12) - arligSkatt);

  const formatLonn = lonn.toLocaleString("nb-NO");
  const formatSkatt = (-skatt).toLocaleString("nb-NO");
  const formatNetto = netto.toLocaleString("nb-NO");
  const formatArligSkatt = (-arligSkatt).toLocaleString("nb-NO");
  const formatArligNetto = arligNetto.toLocaleString("nb-NO");
  const formatArligBrutto = (lonn * 12).toLocaleString("nb-NO");

  const navn = document.getElementById("navn").value
    .trim()
    .split(/\s+/)
    .map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ");

// Erstatt gamle data i den første tabellen

rad.cells[0].innerHTML = `<span>${navn}</span>`;
rad.cells[1].innerHTML = `<span>${formatLonn} kr</span>`;
rad.cells[2].innerHTML = `<span>${skattesats} %</span>`;
rad.cells[3].innerHTML = `<span>${formatSkatt} kr</span>`;
rad.cells[4].innerHTML = `<span>${formatNetto} kr</span>`;
rad.cells[5].innerHTML = `<span>${tlf}</span>`;

  // Erstatt gamle data i den årlige tabellen
if (radArlig) {
  radArlig.cells[0].innerHTML = `<span>${navn}</span>`;
  radArlig.cells[1].innerHTML = `<span>${formatLonn} kr</span>`;
  radArlig.cells[2].innerHTML = `<span>${formatArligBrutto} kr</span>`;
  radArlig.cells[3].innerHTML = `<span>${formatArligNetto} kr</span>`;
  radArlig.cells[4].innerHTML = `<span>${formatArligSkatt} kr</span>`;
}

  // Lagre endringer
  localStorage.setItem("skattTabell", tableBody.innerHTML);
  localStorage.setItem("arligTabell", tablekroppen.innerHTML);

  // Avslutt redigeringsmodus
  radSomRedigeres = null;
  radArligSomRedigeres = null;

  document.getElementById("navn").value = "";
  document.getElementById("lonn").value = "";
  document.getElementById("skattesats").value = "";
  document.getElementById("tlf").value = "";

Swal.fire({
      title: "Flott!",
      width:300,
      text: `Data er oppdatert!`,
      icon: "success"
      });

  /* alert("Data er oppdatert!"); */

  sortere();
}

//---------------------------------------------------- Hover infoBoks ----------------------------------------

const infoBox = document.getElementById("infoBox");
tableBody.addEventListener("mouseover", (e) => {
  const celle = e.target.closest("td");

  if (!celle || celle.cellIndex !== 0) return;

  const rad = celle.parentElement;
  const navn = rad.cells[0].textContent.trim().toLowerCase();

  const arligRad = Array.from(tablekroppen.rows).find(
    row => row.cells[0].textContent.trim().toLowerCase() === navn
  );

  if (!arligRad) return;


  //Årlig ordinær skatt
  const vanligSkatt = Math.abs(
    Number(arligRad.cells[4].textContent.replace(/[^\d]/g, ""))
  );

  // Årlig brutto
  const arligBrutto = Number(
  arligRad.cells[2].textContent.replace(/[^\d]/g, "")
);


// Pensjon: 10 måneder skattefritt + 1 måned skattefritt + 1 måned halv skatt
  const manedSkatt = vanligSkatt / 11.5;
  const pensjonSkatt = Math.round(manedSkatt * 10.5);
  const arlignettoPensjonSkatt = arligBrutto - pensjonSkatt
  


  infoBox.innerHTML = `
    <strong>${arligRad.cells[0].textContent}</strong><br>
    Årlig brutto: ${arligRad.cells[2].textContent}<br>
    Årlig skatt: ${arligRad.cells[4].textContent}<br>
    Årlig netto: ${arligRad.cells[3].textContent}<br><br>
   
    Hvis du er uføretrygdet,<br>
    Årlig brutto pensjon: ${arligRad.cells[2].textContent}<br>
    Årlig skatt på pensjon: ${(-pensjonSkatt).toLocaleString("nb-NO")} kr<br>
    Årlig pensjon etter skatt: ${arlignettoPensjonSkatt.toLocaleString("nb-NO")} kr<br>
    
  `;

  infoBox.style.display = "block";
});


tableBody.addEventListener("mousemove", (e) => {
  infoBox.style.left = `${e.clientX + 15}px`;
  infoBox.style.top = `${e.clientY + 15}px`;
});


tableBody.addEventListener("mouseleave", () => {
  infoBox.style.display = "none";
});

// ------------------------------------------------- Størrelse på localStorage via console log ------------------------------------------------------

let total = 0;

const skatt = localStorage.getItem("skattTabell");
const arlig = localStorage.getItem("arligTabell");

if (skatt) total += skatt.length;
if (arlig) total += arlig.length;

console.log(
  "Brukt størrelse i localStorage: ",
  (total / 1024).toFixed(2),
  "KB",
);


