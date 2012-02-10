/**
 * Handles the login page show event.
 *
 */
$('#drupalgap_page_user_login').live('pageshow',function(){
  try {
	  	// if user is already logged in, send them to the dashboard
	    if (drupalgap_services_system_connect_result.user.uid != 0) {
          alert("Already logged in!");
          $.mobile.changePage("dashboard.html", "slideup");
          return;
        }
	    
	    // if in demo mode, prepopulate login fields
	    // @todo - this type of code should live in the future idea of hook_page_user_login, since it is custom for a particular app
	    if (drupalgap_settings.demo) {
	    	$('#drupalgap_user_login_name').val("demo");
	    	$('#drupalgap_user_login_pass').val("drupalgap2012");
	    }
  }
  catch (error) {
	  console.log("drupalgap_page_user_login");
	  console.log(error);
  }
});

/**
 * Handles the submission of the user login form.
 *
 */
$('#drupalgap_user_login_submit').live('click',function() {
	
	try {
	  
	  // grab name and validate it
	  var name = $('#drupalgap_user_login_name').val();
	  if (!name) { alert('Please enter your user name.'); return false; }
	  
	  // grab pass and validate it
	  var pass = $('#drupalgap_user_login_pass').val();
	  if (!pass) { alert('Please enter your password.'); return false; }
	  
	  // make call to the user login service resource
	  if (drupalgap_services_user_login(name,pass)) {
		  $.mobile.changePage("user.html", "slideup");
	  }
	  else { // login failed...
		  $('#drupalgap_page_user_login_messages').html(drupalgap_services_resource_call_result.errorThrown).show(); // show user result error msg
		  $('#drupalgap_user_login_pass').val(""); // clear password field
	  }
	  
	}
	catch (error) {
	  console.log("drupalgap_user_login_submit - " + error);
	}
	
  return false; // stop the click from executing any further
  
});