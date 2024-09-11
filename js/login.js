var tmp = 3;

function Validate() {
	var userName = document.getElementById("user");
	var password = document.getElementById("pass");

	if (userName.value == "kha" && password.value == "123456") {
		alert("Login successfully!!!");
        window.location.href = 'index.html';
        return false;
	} else {
		alert("Login failed!!!");
		userName.innerHTML = "";
		password.innerHTML = "";
	}
}