var textField = document.getElementById("username");

textField.addEventListener("keyup", ({key}) => {
    if (key === "Enter") {
        loadXMLDoc();
    }
});

function loadXMLDoc() {
    var username = textField.value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

        var resp = JSON.parse(this.responseText);
        var id = resp.id.toString();
        var email = resp.id.toString() + "+" + username + "@users.noreply.github.com";
        document.getElementById("email").innerHTML = email;

    } else if(this.status == 404) {
        document.getElementById("email").innerHTML = "Invalid GitHub username";
    }
  };
  
  xhttp.open("GET", "https://api.github.com/users/" + username, true);
  xhttp.send();
}