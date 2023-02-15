// When the button is clicked check the password
document.getElementById('hibp').addEventListener('click', function(){
	hibpCheck(document.getElementById('password').value);
});
// When the result is ready check if the password was found or not
document.addEventListener('hibpCheck', function (e) {
	if(e.detail){
		document.getElementById('hibp').textContent = "🔴 Unsafe password";
		document.getElementById('hibp').style.color = "red";
	} else {
		document.getElementById('hibp').textContent = "🟢 Safe password";
		document.getElementById('hibp').style.color = "green";
	}
});