$(document).ready(function(){
	document.addEventListener('deviceready',function(){	
		
		StatusBar.show();
		//Function Declarations
		function findContact(){
		//Find all the Contacts found in the Device
			var options = new ContactFindOptions();
			options.filter = "";
			options.multiple = true;
			filter = ["displayName"];
			navigator.contacts.find(filter, foundContacts, onError, options);
		}
		function foundContacts(contacts){
			//Lists all the Found Contacts
			for (var i=0; i<contacts.length; i++) {            
            $("#contactList").append("<li id="+i+"><a href='#'>"+contacts[i].displayName+"</a></li>");
            $("#contactList").listview("refresh");
        }
        	$("#pickbtn").hide("slow");//Used to prevent the user displaying the contact details multiple times
		}
		function readContact(searchedContact){	
			//Reads the selected Contacts details		
			var options      = new ContactFindOptions();
			options.filter   = searchedContact;
			var fields       = ["displayName"];
			navigator.contacts.find(fields, viewContact, onError, options);
		}
		function viewContact(contacts){
			//Displays the selected Contact Details
			var contactData="Selected Contact Details:<br/>";
			contactData+="Name: "+contacts[0].displayName+"<br/>";
			if (contacts[0].phoneNumbers && contacts[0].phoneNumbers[0].type=="mobile") {
				//Checks Whether the Contact have Mobile Number and append the First one to String
				contactData+="Mobile: "+contacts[0].phoneNumbers[0].value+"<br/>";
			}
			if (contacts[0].emails) {
				//Checks Whether the Contact have an Email and append the First one to String
				contactData+="Email: "+contacts[0].emails[0].value+"<br/>";
			}
			if (contacts[0].addresses) {
				//Checks Whether the Contact have an Address and append that to String
				contactData+="Address: "+contacts[0].addresses[0].formatted+"<br/>";
			} 			
			$(":mobile-pagecontainer").pagecontainer("change","#info-page");
			$("#dataBanner").html(contactData);
		}
		function onError(contactError){
			//Displays the Contact Error which has occured
			alert(contactError);
		}
		function infoShow(){
			//Displays App Info
			alert("ConMan"+"\n"+"Version-0.0.1"+"\n"+"Author-Dinesh Raja");
		}

		$(document).on("click","#contactList li",function(){
				readContact($(this).text());//Returns the displayName printed in the List
		});
		
		$("#infobtn").tap(infoShow);//Involkes App Info
		//$("#pickbtn").tap(contactPicker);//Invokes ContactPicker(Removed)
		$("#pickbtn").tap(findContact);
	});
//Loaded all the DOM Elements


});

//Depreciated Codes
/*function onPick(contact){
		//Called when Contact Selected
			
			var contactData="Selected Contact Details:"+"\n";//String Variable to store the details read from Contact

			contactData+="<h1>"+contact.displayName+"</h1>"+"\n";

			
			if (contact.phoneNumbers && contact.phoneNumbers[0].type=="mobile") {
				//Checks Whether the Contact have Mobile Number and append the First one to String
				contactData+="Mobile: "+contact.phoneNumbers[0].value+"<br/>";
			}
			if (contact.emails) {
				//Checks Whether the Contact have an Email and append the First one to String
				contactData+="Email: "+contact.emails[0].value+"<br/>";
			}
			if (contact.addresses) {
				//Checks Whether the Contact have an Address and append that to String
				contactData+="Address: "+contact.addresses[0].formatted+"<br/>";
			}
			if (contact.photos) {
				//Checks for the Contact Pic and append its info to String
				s+="<p><img src='"+contact.photos[0].value+"'></p>";
			}
				//Prints the contents of the String "contentData" to the div
				$("#dataBanner").html(contactData);
		}
		function contactPicker(){
		//Displays Native ContactPicker			
			navigator.contacts.pickContact(onPick);
		} */