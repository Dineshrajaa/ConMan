$(document).ready(function(){
	document.addEventListener('deviceready',function(){
		
		function onPick(contact){
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
		}
		function findContact(){
		//Find all the Contacts found in the Device
			var options = new ContactFindOptions();
			options.filter = "";
			options.multiple = true;
			filter = ["displayName"];
			navigator.contacts.find(filter, foundContacts, onError, options);
		}
		function foundContacts(contacts){
			for (var i=0; i<contacts.length; i++) {
            alert(contacts[i].displayName);
        }

		}
		function onError(contactError){
			alert(contactError);
		}
		function infoShow(){
		//Displays App Info
			alert("ConMan"+"\n"+"Version-0.0.1"+"\n"+"Author-Dinesh Raja");
		}

		
		
		$("#findbtn").tap(infoShow);//Involkes App Info
		//$("#pickbtn").tap(contactPicker);//Invokes ContactPicker
		$("#pickbtn").tap(findContact);
	});
//Loaded all the DOM Elements
});