var textField = document.getElementsByTagName("input")[0];
var emailDisp = document.getElementsByTagName("span")[0];

textField.addEventListener("keyup", ({key}) => {
    if (key !== "Enter") {
        return;
    }

    var username = textField.value;

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://api.github.com/users/" + username, true);
    xhttp.send();

    xhttp.onloadend = function() {
        var button = document.getElementsByTagName("button")[0];

        if (this.readyState == 4 && this.status === 200) {

            var resp = JSON.parse(this.responseText);
            var email = resp.id.toString() + "+" + resp.login + "@users.noreply.github.com";

            emailDisp.innerHTML = email;
            button.style.display = "inline";

        } else if(this.status == 404) {
            emailDisp.innerHTML = "Invalid GitHub username";
            button.style.display = "none";
        }

        document.getElementById('post').style.display = 'block';
        document.getElementById('notice').style.display = 'block';

    };
});

var button = document.getElementsByTagName("button")[0];
button.addEventListener("click", () => {
    navigator.clipboard.writeText(emailDisp.innerHTML);

    var width = button.offsetWidth;
    button.innerHTML = "✔";
    button.style.width = width.toString() + "px";
    
    setTimeout(function() {
        button.innerHTML = "Copy";
    }, 1000);
});