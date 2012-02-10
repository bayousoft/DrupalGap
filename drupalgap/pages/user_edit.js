$('#drupalgap_page_user_edit').live('pageshow',function(){
	try {
		$('#drupalgap_user_edit_name').val(drupalgap_user.name);
		$('#drupalgap_user_edit_mail').val(drupalgap_user.mail);
    }
	catch (error) {
		console.log("drupalgap_page_user_edit - " + error);
		alert("drupalgap_page_user_edit - " + error);
	}
});

/**
 * Handles the submission of the user edit form.
 *
 */
$('#drupalgap_user_edit_submit').live('click',function() {
	
	try {
		
		// stop demo user from editing account
		if (drupalgap_settings.demo && drupalgap_user.name == "demo") {
			alert("Sorry, the demo account can't be changed.");
			return false;
	    }
		
		// grab form input...
		
		name = $('#drupalgap_user_edit_name').val();
		current_pass = $('#drupalgap_user_edit_current_pass').val();
		mail = $('#drupalgap_user_edit_mail').val();
		pass1 = $('#drupalgap_user_edit_pass1').val();
		pass2 = $('#drupalgap_user_edit_pass2').val();
		
		// validate user name
		if (!name) {
			alert("Enter Username");
			return false;
		}
		
		// validate e-mail
		if (!mail) {
			alert("Enter E-mail Address");
			return false;
		}
		// if user changed e-mail address, make sure password was provided
		if (drupalgap_user.mail != mail && !current_pass) {
			if (!current_pass) {
				alert("Enter current password to change e-mail.");
				return false;
			}
		}
		
		// if user is changing passwords, make sure the new passwords match 
		// and their current password was provided
		if (pass1 && pass2) {
			if (pass1 != pass2) {
				alert("New passwords do not match!");
				return false;
			}
			else if (!current_pass) {
				alert("Enter your current password to change your password.");
				return false;
			}
		}
		
		var temp_user = drupalgap_user;
		temp_user.name = name;
		temp_user.mail = mail;
		temp_user.current_pass = current_pass;
		temp_user.pass1 = pass1;
		temp_user.pass2 = pass2;
		
		var user_update = drupalgap_services_user_update(temp_user);
		
		if (user_update.uid) { // user update successful...
			$.mobile.changePage("user.html", "slideup");
		}
		else { // update failed...
			$('#drupalgap_page_user_edit_messages').html(""); // clear any existing messages
			$('#drupalgap_page_user_edit_messages').append("<li>" + user_update.errorThrown + "</li>");
			$('#drupalgap_page_user_edit_messages').show();
		}
	}
	catch (error) {
	  console.log("drupalgap_user_edit_submit");
	  console.log(error);
	}
	
  return false; // stop the click from executing any further
  
});