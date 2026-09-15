const PALETTE_SIZE = 6;
const COPY_FEEDBACK_MS = 1500;

const generateBth = document.getElementById('generate-btn');
const paletteContainer = document.querySelector('.palette-container');
const boxTemplate = document.getElementById('color-box-template');

generateBth.addEventListener('click', generatePalette);
paletteContainer.addEventListener('click', handleCopyClick);
generatePalette();


// Event handlers
function handleCopyClick(e) {
    const box = e.target.closest(".color-box");
    if (!box) return;

    // Only react to clicks on the swatch or the copy button
    if (!e.target.closest(".copy-bth") && !e.target.closest(".color")) return;

    const button = box.querySelector(".copy-bth");
    const hexValue = button.dataset.color;

    navigator.clipboard
        .writeText(hexValue)
        .then(() => showCopySuccess(button))
        .catch((err) => alert("Failed to copy color code: " + err));
}

// Utility functions
function generatePalette() {
    const colors = [];
    for (let i = 0; i < PALETTE_SIZE; ++i) {
        colors.push(generateRandomColor());
    }
    renderPalette(colors);
}

function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#"

    for (let i = 0; i < 6; i++) {
        color +=letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Render functions
function renderPalette(colors) {
    const boxes = colors.map(createColorBox);
    paletteContainer.replaceChildren(...boxes); 
}

function createColorBox(color) {
    const box = boxTemplate.content.firstElementChild.cloneNode(true);

    box.querySelector(".color").style.backgroundColor = color;
    box.querySelector(".hex-value").textContent = color;
    box.querySelector(".copy-bth").dataset.color = color;

    return box;
}

function showCopySuccess(button) {
    const icon = button.querySelector("i");

    icon.classList.replace("far", "fas");
    icon.classList.replace("fa-copy", "fa-check");
    button.classList.add("copied");
    
    setTimeout(() => {
        icon.classList.replace("fas", "far");
        icon.classList.replace("fa-check", "fa-copy");
        button.classList.remove("copied");
    }, COPY_FEEDBACK_MS)
}