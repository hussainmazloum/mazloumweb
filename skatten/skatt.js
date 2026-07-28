const tableBody = document.getElementById("tableBody");
const tablekroppen = document.getElementById("tablekroppen");

 let sisteNavn = "";

let radSomRedigeres = null;
let radArligSomRedigeres = null;

function beregneSkatte() {
  const name = document.getElementById("navn");
  const lonn = document.getElementById("lonn");
  const skattesats = document.getElementById("skattesats");

 

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
    isNaN(lonnVerdi) ||
    isNaN(skattProsent) ||
    lonnVerdi <= 0 ||
    skattProsent <= 0
  ) {
    alert("Fyll inn gyldige tall.");
    return;
  }
  if (skattProsent > 100) {
    alert("Skatt må være mindre enn 100 %");
    return;
  }

  const skatten = Math.round(skatteIntekt(lonnVerdi, skattProsent));
  const lonnEtterSkatte = Math.round(lonnVerdi - skatten);
  const arligNetto = Math.round(lonnEtterSkatte * 12);
  const arligSkatt = Math.round(skatten * 11.5);
  const uforArligSkatt = Math.round(skatten * 10.5);
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

  const formatertuforArligSkatt = (-uforArligSkatt).toLocaleString("nb-NO", {
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
  
  document.getElementById("navn").focus(); // muse kommer tilbake til felt navn når den beregner og lage data .
}

//------------------------------------------------------- Lagre data i local storage ---------------------------------------------------------------------------

function lagreData() {
  //Denne funksjonen heter `saveData()`, og formålet med den er å lagre innholdet i de to tabellene i `localStorage`,
  // slik at dataene blir værende etter at siden er lastet inn på nytt.
  if (tableBody.rows.length === 0 && tablekroppen.rows.length === 0) {
    alert("Det finnes ingen informasjon å lagre!");
    return;
  }

  localStorage.setItem("skattTabell", tableBody.innerHTML);
  localStorage.setItem("arligTabell", tablekroppen.innerHTML);

  alert(`Data til ${sisteNavn} er lagret!`);
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
  // Den tar imot én parameter, `slettbtn`, som er sletteknappen brukeren klikket på.
  const row = slettbtn.closest("tr"); // closest("tr") søker etter det nærmeste <tr>-elementet (tabellraden) som inneholder knappen.Denne raden lagres i variabelen `row`.

  // Radnummeret i tbody
  const index = Array.from(tableBody.rows).indexOf(row); //Forklaring : "tableBody.rows" Returnerer alle <tbody>-rader.
  //tableBody.rows er en HTMLCollection, ikke en array.Derfor konverterer vi den til en array:Array.from(tableBody.rows)
  // "indexOf(row)" Den søker etter raden hvis knapp brukeren klikket på.
  if (confirm("Er du sikker på at du vil slette den raden i tabellen?")) {
    if (index !== -1) {
      // Den verifiserer at raden allerede finnes.Hvis han ikke finner det:index = -1;
      // // I så fall vil ikke slettingen finne sted.

      tableBody.deleteRow(index); // Raden slettes fra den første tabellen (tableBody).
      tablekroppen.deleteRow(index); // Selve raden slettes fra den andre tabellen (tabellkroppen).
      leggTilHover();
      localStorage.setItem("skattTabell", tableBody.innerHTML); // Innholdet i den første tabellen lagres i localStorage etter sletting.

      localStorage.setItem("arligTabell", tablekroppen.innerHTML); // Innholdet i den andre tabellen bevares også etter sletting.
    }
  }
}

//------------------------------------------------------- Fjerne data fra local storage ---------------------------------------------------------------------------

function fjerneData() {
  if (confirm("Er du sikker på at du vil slette alle data i tabellene?")) {
    tableBody.innerHTML = "";
    tablekroppen.innerHTML = "";

    localStorage.removeItem("skattTabell");
    localStorage.removeItem("arligTabell");
  }
}

//------------------------------------------------------- lukke siden ---------------------------------------------------------------------------

function lukkSide() {
  if (confirm("Vil du lukke siden?")) {
    window.top.location.href = "../index.html";
  }
}

// ------------------------------------------------- søke etter bruttolønn ------------------------------
function sokNavn() {
  const input = document.getElementById("sokNavnInput");
  const sok = input.value.trim().toLowerCase();
  const sokeType = document.getElementById("sokeType").value;

  if (sok === "") {
    alert("Skriv inn et navn.");
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

    let treff = false;

    if (sokeType === "fornavn") {
      treff = fornavn.startsWith(sok);
    } else if (sokeType === "etternavn") {
      treff = etternavn.startsWith(sok);
    } else {
      treff = fulltNavn.toLowerCase().startsWith(sok);
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
    alert(`Ingen navn med "${sok}" ble funnet.`);
  } else {
    alert(`Fant ${antallNavneFunnet} navn med "${sok}".`);
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

  radSomRedigeres = rad;
  radArligSomRedigeres = tablekroppen.rows[index];
}

// ------------------------------------------------------------------ lagre endring ------------------------------------------------
function lagreEndring() {
  if (radSomRedigeres === null) {
    alert("Ingen rad er valgt for redigering.");
    return;
  }

  const rad = radSomRedigeres;
  const radArlig = radArligSomRedigeres;

  const navn = document.getElementById("navn").value.trim();
  const lonn = Number(document.getElementById("lonn").value);
  const skattesats = Number(document.getElementById("skattesats").value);

  const skatt = Math.round((lonn * skattesats) / 100);
  const netto = Math.round(lonn - skatt);

  const formatLonn = lonn.toLocaleString("nb-NO");
  const formatSkatt = (-skatt).toLocaleString("nb-NO");
  const formatNetto = netto.toLocaleString("nb-NO");

  // استبدال البيانات القديمة في الجدول الأول
  rad.cells[0].textContent = navn;
  rad.cells[1].textContent = formatLonn + " kr";
  rad.cells[2].textContent = skattesats + " %";
  rad.cells[3].textContent = formatSkatt + " kr";
  rad.cells[4].textContent = formatNetto + " kr";

  // استبدال البيانات القديمة في الجدول السنوي
  if (radArlig) {
    radArlig.cells[0].textContent = navn;
    radArlig.cells[1].textContent = formatLonn + " kr";
    radArlig.cells[2].textContent = (lonn * 12).toLocaleString("nb-NO") + " kr";
    radArlig.cells[3].textContent =
      (netto * 12).toLocaleString("nb-NO") + " kr";
    radArlig.cells[4].textContent =
      (-skatt * 11.5).toLocaleString("nb-NO") + " kr";
  }

  // حفظ التغييرات
  localStorage.setItem("skattTabell", tableBody.innerHTML);
  localStorage.setItem("arligTabell", tablekroppen.innerHTML);

  // إنهاء وضع التعديل
  radSomRedigeres = null;
  radArligSomRedigeres = null;

  // تنظيف الحقول
  document.getElementById("navn").value = "";
  document.getElementById("lonn").value = "";
  document.getElementById("skattesats").value = "";

  alert("Data er oppdatert!");

  sortere();
}


