// 1. Validierung der Eingabe
// 2. Hinzufügen von Zeilen zur Tabelle
// 3. Soertierung der tabelle
// 4. Zurücksetzung der Eingabefelder

document.getElementById("send").onclick = function () {
  // Hilfs Code
  // Name und Bewertung von erste Input Feldern
  const modul = document.getElementById("modul").value;
  const bewertung = parseInt(document.getElementById("bewertung").value);

  // Validierung der Eingabe
  // isNaN = not a number
  if (modul === "" || isNaN(bewertung) || bewertung < 1 || bewertung > 5) {
    alert(
      "Bitte geben Sie einen gültigen Modulnamen und eine Bewertung zwischen 1 und 5 ein."
    );
    return;
  }

  // Hilfs Code
  // selektiert die tabelle und sucht innerhalb dieser Tabelle die tbody
  const tbody = document
    .getElementById("bewertungstabelle")
    .querySelector("tbody");
  const newRow = document.createElement("tr");

  // Hinzufügen Logik
  newRow.innerHTML = `<td>${modul}</td><td>${bewertung}</td>`;
  tbody.appendChild(newRow);

  // Bewertungen sortieren
  sortTable();

  // Eingabefelder zurücksetzen>
  document.getElementById("modul").value = "";
  document.getElementById("bewertung").value = "";
};

function sortTable() {
  // 1. Hole die tbody und wandle die Zeilen in ein Array um
  const tbody = document
    .getElementById("bewertungstabelle")
    .querySelector("tbody");
  const rowsArray = Array.from(tbody.rows);

  // 2. Sortiere die Zeilen basierend auf der Bewertung
  rowsArray.sort(function (rowA, rowB) {
    // Hole die Bewertungen als Text und wandle sie in Zahlen um
    let bewertungA = parseInt(rowA.cells[1].innerText);
    let bewertungB = parseInt(rowB.cells[1].innerText);

    console.log(rowsArray);

    // Sortiere absteigend
    if (bewertungA > bewertungB) {
      return -1; // rowA soll vor rowB kommen
    } else if (bewertungA < bewertungB) {
      return 1; // rowB soll vor rowA kommen
    } else {
      return 0; // beide sind gleich, keine Änderung
    }
  });

  // 3. Leere das tbody und füge die sortierten Zeilen wieder ein, immer wenn ein neuer Eintrag in der Liste erscheint
  tbody.innerHTML = "";
  for (let i = 0; i < rowsArray.length; i++) {
    tbody.appendChild(rowsArray[i]);
  }
}

document.getElementById("save").onclick = function () {
  save();
};

// die Daten von Tabelle müssen nun als Objekt gespeichert werden und zu Array gespeichrt werden
// Methode 01
function save() {
  const tbody = document.querySelector("tbody");
  // tbody.rows gibt eine HTMLCollection aller <tr>-Elemente innerhalb des <tbody>-Elements zurück.
  // Die Methode erstellt ein neues Array und kopiert die Elemente des übergebenen Objekts in dieses Array.
  const rowsArray = Array.from(tbody.rows);

  // weitere logik
  const data = rowsArray.map((row) => {
    return {
      modul: row.cells[0].innerText,
      bewertung: parseInt(row.cells[1].innerText),
    };
  });

  /* console.log(rowsArray); */

  console.log(data);
}
