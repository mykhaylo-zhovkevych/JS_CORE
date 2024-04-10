let username;

username = window.prompt("what is user name");

console.log(username);

// another method

document.getElementById("mySub").onclick = function() {
    username = document.getElementById("myText").value;
    console.log(username);
    document.getElementById("myH1").textContent = `hello ${username}`;
}