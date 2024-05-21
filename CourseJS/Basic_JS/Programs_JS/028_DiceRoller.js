function rollDice() {

    // Schritt 1: Erhalte die Anzahl der Würfel aus dem Eingabefeld
    const numOfDice = document.getElementById('numOfDice').value;

     // Schritt 2: Hole die Referenz zu den HTML-Elementen, in die die Ergebnisse geschrieben werden
    const diceResult = document.getElementById("diceResult");
    const diceImages = document.getElementById("diceImages");
     // Schritt 3: Erstelle leere Arrays, um die gewürfelten Werte und die zugehörigen Bild-HTML-Elemente zu speichern
    const values = [];
    const images = [];

    for(let i = 0; i < numOfDice; i++){
        // a) Generiere eine Zufallszahl zwischen 1 und 6
        const value = Math.floor(Math.random() * 6) + 1;
        // b) Speichere den gewürfelten Wert im Array `values`
        values.push(value);

        // c) Erstelle ein HTML-Element für das Bild des Würfels und speichere es im Array `images`
        // creating the html element the value represents name of the file
        images.push(`<img src="imgs/dice-six-face-${value}.png" alt="Dice ${value}">`);

       
    }
    diceResult.textContent = `dive: ${values.join(', ')}`;

    diceImages.innerHTML = images.join('');

}   



