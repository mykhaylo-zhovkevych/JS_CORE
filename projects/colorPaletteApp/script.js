const generateBth = document.getElementById('generate-btn');
const paletteContainer = document.querySelector('.palette-container');
// const copyBth = document.querySelector('.copy-bth');

generateBth.addEventListener('click', generatePalette);
paletteContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains("copy-bth")) {
        // This previousElementSibling select the previous sibling element
        const hexValue = e.target.previousElementSibling.textContent;

        navigator.clipboard
            .writeText(hexValue)
            .then(() => showCopySuccess(e.target))
            .catch((e) => alert("Failed to copy color code: ", e));
    } else if (e.target.classList.contains("color")) {
        // Inside of the color div go the next sibling element and select the hex value
        const hexValue = e.target.nextElementSibling.querySelector(".hex-value").textContent;

        navigator.clipboard
            .writeText(hexValue)
            .then(() => showCopySuccess(e.target.nextElementSibling.querySelector(".copy-bth")))
            .catch((e) => alert("Failed to copy color code: ", e));
    }
});

function generatePalette() {
    const colors = [];
    for (let i = 0; i < 5; i++) {
        colors.push(generateRandomColor());
    }

    updatePaletteDisplay(colors);
}

function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#"

    for (let i = 0; i < 6; i++) {
        color +=letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function updatePaletteDisplay(colors) {
    const colorBoxes = document.querySelectorAll('.color-box');
    colorBoxes.forEach((box, index) => {
        const color = colors[index];
        const colorDiv = box.querySelector(".color");
        const hexValue = box.querySelector(".hex-value");

        colorDiv.style.backgroundColor = color;
        hexValue.textContent = color;
    });
}

function showCopySuccess(button) {
    button.classList.remove("far", "fa-copy");
    button.classList.add("fas", "fa-check");
    button.style.color = "#48nn78";

    setTimeout(() => {
        button.classList.remove("fas", "fa-check");
        button.classList.add("far", "fa-copy");
        button.style.color = "";
    }, 1500)
}


generatePalette();