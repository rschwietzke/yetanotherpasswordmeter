	 		function HibpGetXhr(){
                var xhr = null; 
				if(window.XMLHttpRequest) 
				   xhr = new XMLHttpRequest(); 
				else if(window.ActiveXObject){
				   try {
			                xhr = new ActiveXObject("Msxml2.XMLHTTP");
			            } catch (e) {
			                xhr = new ActiveXObject("Microsoft.XMLHTTP");
			            }
				}
				else { 
				   alert("Votre navigateur ne supporte pas les objets XMLHTTPRequest..."); 
				   xhr = false; 
				} 
				return xhr;
			}
 
			function HibpRequest(){
				var passwordField = $("#password");
				var password = passwordField.val();
				var xhr = HibpGetXhr();
				xhr.onreadystatechange = function(){
					var hibpstatus = null;
					if(xhr.readyState == 4){
						if(xhr.status == 200) {
							$("#hibp").html("Yes (warning!)");
							$("#hibpline").addClass("warning");		
						}
						else if(xhr.status == 400) {
							$("#hibp").html("Bad request");
						}						
						else if(xhr.status == 403) {
							$("#hibp").html("Bad request");
						}
						else if(xhr.status == 404) {
							$("#hibp").html("No");
						}
						else if(xhr.status == 429) {
							$("#hibp").html("Service temporarily unavailable, too many requests");
						}
						else {
							$("#hibp").html("Unknown error");
						}
					}
				}
				xhr.open("GET","https://haveibeenpwned.com/api/v2/pwnedpassword/"+sha1(password),true);
				xhr.send(null);
			}