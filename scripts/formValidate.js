var name;
function validate(e)
{
	//	Hides all errors
	hideErrors();

	//	Determine if the form has errors
	if(formHasErrors()){
		e.preventDefault();
		return false;
	}
	hideErrors();
	clear();
	confirm('Success!' + "\nThank you: "+ name + " for your contact request.");
	return true;
}

/*
 * Handles the reset event for the form.
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm(e)
{
	// Confirm that the user wants to reset the form.
	if ( confirm('Clear?') )
	{
		clear();
		// Ensure all error fields are hidden
		hideErrors();
		
		// Set focus to the first text field on the page
		document.getElementById("fullname").focus();
		
		// When using onReset="resetForm()" in markup, returning true will allow
		// the form to reset
		return true;
	}

	// Prevents the form from resetting
	e.preventDefault();
	
	// When using onReset="resetForm()" in markup, returning false would prevent
	// the form from resetting
	return false;	
}

function clear()
{
	let inputs = document.getElementsByTagName("input")
		for(let i =0;i<inputs.length;i++)
			inputs[i].value = "";

		document.getElementById("comment").value ="";
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors()
{

	let hasError = false;
	
	let requiredTextFields = ["fullname","phone","email"];
	for ( let i = 0; i < requiredTextFields.length; i++ )
	{

		// Get an object from the DOM using the id of the current element and get rid of any extra spaces
		let textField = document.getElementById(requiredTextFields[i]);
		if(requiredTextFields[i] == "fullname")
		name = textField.value;
		// Determine if the text field has input
		if ( !formFieldHasInput(textField))
		{
			// Get the error object from the DOM for the appropriate 
			// text field and make it visible
			document.getElementById(requiredTextFields[i] + "_error").style.display = "block";

			// Determine if this is the first error
			// If so, set focus to the text field
			if ( !hasError )
			{
				// set focus to the text field that caused the error
				textField.focus();

				// select the text in the text field
				textField.select();
			}

			// Raise the error flag indicating a validation error
			hasError = true;
		}
		else if(requiredTextFields[i] == "email")
		{
			//validate proper email
			let regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

			if(!regex.test(textField.value))
			{
				document.getElementById("emailformat_error").style.display = "block";

				if ( !hasError )
				{
					// set focus to the text field that caused the error
					textField.focus();

					// select the text in the text field
					textField.select();
				}
				
				hasError = true;

			}
		}
		else if(requiredTextFields[i] == "phone")
		{
			//validate proper phone number
			let regex = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/);

			if(!regex.test(textField.value))
			{
				document.getElementById("phoneformat_error").style.display = "block";

				if ( !hasError )
				{
					// set focus to the text field that caused the error
					textField.focus();

					// select the text in the text field
					textField.select();
				}
				
				hasError = true;

			}
		}

	}
		
		return hasError;
	}


	


/*
 * Determines if a text field element has input
 *
 * param   fieldElement A text field input element object
 * return  True if the field contains input; False if nothing entered
 */
function formFieldHasInput(fieldElement)
{
	// Check if the text field has a value
	if ( fieldElement.value == null || trim(fieldElement.value) == "" )
	{
		// Invalid entry
		return false;
	}
	
	// Valid entry
	return true;
}

function trim(str) 
{
	// Uses a regex to remove spaces from a string.
	return str.replace(/^\s+|\s+$/g,"");
}



/*
 * Hides all of the error elements.
 */
function hideErrors()
{


	document.getElementById("fullname_error").style.display = "none";
	document.getElementById("phone_error").style.display = "none";
	document.getElementById("email_error").style.display = "none";
	document.getElementById("emailformat_error").style.display = "none";
	document.getElementById("phoneformat_error").style.display = "none";

}

/*
 * Handles the load event of the document.
 */
function load()
{

	hideErrors();

	//listeners for submit and reset buttons.
	document.getElementById("submit").addEventListener("click", validate, false);
	document.getElementById("clear").addEventListener("click", resetForm, false);
}



// Add document load event listener
document.addEventListener("DOMContentLoaded", load);












