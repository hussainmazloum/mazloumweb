const tableBody = document.getElementById("tableBody");
const tablekroppen = document.getElementById("tablekroppen");

function beregneSkatte() {
  const name = document.getElementById("navn");
  const lonn = document.getElementById("lonn");
  const skattesats = document.getElementById("skattesats");

  const nom = name.value
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
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
    <td><span">${nom}</span></td>
    <td><span >${formatertPris} kr</span></td>
    <td><span >${skattProsent} %</span></td>
    <td><span >${formatertSkatt} kr</span></td>
    <td><span >${formatertLonn} kr</span></td>
    <td>
        <button class="remove-btn" onclick="slettRad(this)">
            Slette
        </button>
    </td>
</tr>`;

  tablekroppen.innerHTML += `
<tr>
    <td><span >${nom}</span></td>
    <td><span >${formatertPris}  kr</span></td>
    <td><span >${formatertArligBrutto}  kr</span></td>
    <td><span >${formatertArligNetto}  kr</span></td>
    <td><span >${formatertArligSkatt}  kr</span></td>
    <!-- <td><span style="color:#ffffff;">${formatertuforArligSkatt}</span> kr</td> -->
   
</tr> `;

  //------------------------------------------------------- Tøm inputfeltene etter at funksjonen er kjørt ---------------------------------------------------------------------------
  name.value = "";
  lonn.value = "";
  skattesats.value = "";
}

/* 
function btn() {
  location.reload();
} */

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

  alert("Data er lagret!");
}

window.onload = function () {
  // Denne koden kjøres når siden lastes inn; dens oppgave er å hente dataene som er lagret i `localStorage`,
  // og gjenopprette dem i de to tabellene.

  const tabell = localStorage.getItem("skattTabell");
  const arlig = localStorage.getItem("arligTabell");

  if (tabell) tableBody.innerHTML = tabell;
  if (arlig) tablekroppen.innerHTML = arlig;
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
  const input = document.getElementById("sokNavn");
  const sok = input.value.trim().toLowerCase();

  if (sok === "") {
    alert("Skriv inn et navn.");
    return;
  }

  let funnet = false;

  // Fjern det forrige valget
  tableBody
    .querySelectorAll("tr")
    .forEach((row) => row.classList.remove("search-row"));

  tablekroppen
    .querySelectorAll("tr")
    .forEach((row) => row.classList.remove("search-row"));

  for (let i = 0; i < tableBody.rows.length; i++) {
    const navn = tableBody.rows[i].cells[0].textContent.trim().toLowerCase();

    if (navn.includes(sok)) {
      tableBody.rows[i].classList.add("search-row");

      if (tablekroppen.rows[i]) {
        tablekroppen.rows[i].classList.add("search-row");
      }

      if (!funnet) {
        setTimeout(() => {
          tableBody.rows[i].scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
          });
        }, 50);

        funnet = true;
      }
    }
  }

  if (!funnet) {
    alert("Ingen navn ble funnet.");
  }

  input.value = "";
}
document.getElementById("sokNavn").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    sokNavn();
  }
});

// ------------------------------------------------- Størrelse på localStorage via console log ------------------------------

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
