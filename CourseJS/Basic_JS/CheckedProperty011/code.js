// . checked =
// property that determines the checked state of an
// HTML checkbox or radio button element
/* The .checked property is a boolean attribute, which means it can only hold two values: true or false. It specifically applies to <input> elements of type checkbox or radio. */

const myCheckBox = document.getElementById("myCheckBox");
const visaBth = document.getElementById("visaBth");
const masterBth = document.getElementById("masterBth");
const cashBth = document.getElementById("cashBth");
const mySubmit = document.getElementById("mySubmit");
const SubResult = document.getElementById("SubResult");
const PaymentResult = document.getElementById("PaymentResult");


mySubmit.onclick = function() {
    if(myCheckBox.checked) {
        SubResult.textContent = `you are subscribed.`;
    }
    else {
        SubResult.textContent = `you are not subscribed.`;
    }
    if(visaBth.checked){
        PaymentResult.textContent = `you are paying with Visa`
    } 
    else if(masterBth.checked){
        PaymentResult.textContent = `you are paying with mastercard`
    } 
    else if(cashBth.checked){
        PaymentResult.textContent = `you are paying with cash`
    } 
    else {
        PaymentResult.textContent = `you must select a payment type` 
    }
}