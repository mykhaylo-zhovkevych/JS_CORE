const decreaseBtn = document.getElementById("decreaseBtn");
const resetBtn = document.getElementById("resetbtn");
const increaseBtn = document.getElementById("increaseBtn");
// html elements will not be reassigned so they can be consts
const countLabel = document.getElementById("countLabel");
let count = 0;

increaseBtn.onclick = function() {
    count++;
    countLabel.textContent = count;
}

decreaseBtn.onclick = function() {
    count--;
    countLabel.textContent = count;
}

resetBtn.onclick = function() {
    count = 0;
    countLabel.textContent = count;
}
