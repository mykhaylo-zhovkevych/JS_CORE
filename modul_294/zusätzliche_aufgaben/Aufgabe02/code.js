// Das canvas-Element in HTML ermöglicht es, Grafiken und Animationen dynamisch zu erstellen und direkt im Browser zu rendern. Es bietet eine Zeichenfläche (eine "Leinwand"), auf der du mit JavaScript Formen, Bilder, Text und Animationen zeichnen kannst.

// wenn die key-tasten sind gedrückt werden sie true

let Key_SPACE = false; // 32
let KEY_UP = false; // 38
let KEY_DOWN = false; // 40


let rocket = {
    x: 100,
    y: 200,
    width: 200,
    height: 80,
    scr: 'img/rocket.png'
};

let ufo = {
    x: 500,
    y: 200,
    width: 100,
    height: 40,
    scr: 'img/ufo.png'
};


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


