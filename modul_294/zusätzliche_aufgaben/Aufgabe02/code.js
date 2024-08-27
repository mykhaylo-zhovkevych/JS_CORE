// Das canvas-Element in HTML ermöglicht es, Grafiken und Animationen dynamisch zu erstellen und direkt im Browser zu rendern. Es bietet eine Zeichenfläche (eine "Leinwand"), auf der du mit Javasrcipt Formen, Bilder, Text und Animationen zeichnen kannst.

// wenn die key-tasten sind gedrückt werden sie true

/*
Warum unterschiedliche Ansätze wählen?
Verwendung von new Image(): Wenn du direkt ein Bild laden und rendern möchtest, ist new Image() der einfachste Weg, ein Bild zu initialisieren.
Verwendung von Objekten mit einem src-Pfad: Wenn dein Objekt mehr als nur das Bild enthalten soll (z. B. Positionen, Größen, andere Eigenschaften), ist es sinnvoll, 
ein komplexes Objekt zu erstellen. Innerhalb dieses Objekts kannst du dann den Bildpfad als eine Eigenschaft definieren und später in ein Image-Objekt umwandeln, wenn das Bild tatsächlich gezeichnet wird.
*/

let Key_SPACE = false; // 32
let KEY_UP = false; // 38
let KEY_DOWN = false; // 40
let canvas;

// Mit getContext("2d") erhältst du einen 2D-Zeichenkontext. Dieser Kontext wird in der Variablen ctx gespeichert und bietet dir alle Methoden und Eigenschaften, um auf dem Canvas zu zeichnen
let ctx;
let backgroundImage = new Image();

let rocket = {
  x: 100,
  y: 200,
  width: 100,
  height: 60,
  src: "imgs/rocket.png",
};

let ufos = [];

document.onkeydown = function (e) {
  if (e.keyCode == 32) {
    // leertatste gedrückt
    Key_SPACE = true;
  }

  if (e.keyCode == 38) {
    // Nach oben gedrückt
    KEY_UP = true;
  }

  if (e.keyCode == 40) {
    // Nach unten gedrückt
    KEY_DOWN = true;
  }
};

document.onkeyup = function (e) {
  if (e.keyCode == 32) {
    // Leertaste losgelasse
    KEY_SPACE = false;
  }

  if (e.keyCode == 38) {
    // Nach oben losgelasse
    KEY_UP = false;
  }

  if (e.keyCode == 40) {
    // Nach unten losgelasse
    KEY_DOWN = false;
  }
};

// Haupt Funktion die ruft alle andere Funktionen
function startGame() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  loadImage();
  // damit der Ding 25 mal pro Sekunde sich widerholt
  setInterval(update, 1000 / 25);
  setInterval(createUfos, 5000);

  draw();
}

// funktionsblokc der regelmässig muss ausgeführt werden
function update() {
  if (KEY_UP) {
    rocket.y -= 5;
  }
  if (KEY_DOWN) {
    rocket.y += 5;
  }

  ufos.forEach(function(ufo){

    ufo.x -= 5;

  });

}

function createUfos() {
  let ufo = {
    x: 500,
    y: 200,
    width: 100,
    height: 40,
    src: "imgs/ufo.png",
    img: new Image(),
  };

  ufo.img.src = ufo.src;  // Ufo Bild wird geladen

  ufos.push(ufo);
}

// In dieser Funktion lade ich Bilder von beckground herunter und zwei bildern von Objekte
function loadImage() {
  backgroundImage.src = "imgs/background.png";
  // Diese Zeile erstellt ein neues Image-Objekt und weist es der Eigenschaft img des rocket-Objekts zu. Dieses Image-Objekt ist wie ein leeres Glas – es hat noch kein Bild.
  rocket.img = new Image();
  // Setzt das Bild in den Rahmen (lädt das Bild in das Image-Objekt)
  rocket.img.src = rocket.src;
}

// die draw Methode muss regelmassig verwendet werden
function draw() {
  ctx.drawImage(backgroundImage, 0, 0);
  ctx.drawImage(rocket.img, rocket.x, rocket.y, rocket.width, rocket.height);

  ufos.forEach(function (ufo) {
    ctx.drawImage(ufo.img, ufo.x, ufo.y, ufo.width, ufo.height);
  });

  requestAnimationFrame(draw);
}

// 1:16:33 / 1:30:50