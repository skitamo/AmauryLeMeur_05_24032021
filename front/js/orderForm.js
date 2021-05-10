// récupération du formulaire du panier
	const orderForm = document.getElementById("orderForm");
	const firstName = document.getElementById("firstName");
	const lastName = document.getElementById("lastName");
	const address = document.getElementById("address");
	const city = document.getElementById("city");
	const email = document.getElementById("email");
	const cartForm = document.getElementById("formValidation");

	//---------------------validation firstName----------------------
	function validFirstName(firstName) {
		let firstNameRegex = new RegExp('^[A-Za-zéèê \-]{2,30}$', 'g');
		let testfirstNameRegex = firstNameRegex.test(firstName.value);
		console.log(testfirstNameRegex);
		let small = firstName.nextElementSibling;
		if (testfirstNameRegex) {
			small.innerHTML = "Prénom valide";
			small.style.color = "green";
			console.log("valide")
			return true;
		} else {
			small.innerHTML = "Veuillez entrer un prénom valide";
			small.style.color ="red";
			console.log("non valide")
			return false;
		}
	};
	// écoute des modifications sur input firstName
	firstName.addEventListener("change", () => {
		console.log(validFirstName(firstName));
	});


	//---------------------validation lastName----------------------
	function validLastName(lastName) {
		let lastNameRegex = new RegExp('^[A-Za-zéèê \-]{2,30}$', 'g');
		let testlastNameRegex = lastNameRegex.test(lastName.value);
		console.log(testlastNameRegex);
		let small = lastName.nextElementSibling;
		if (testlastNameRegex) {
			small.innerHTML = "Nom de famille valide";
			small.style.color = "green";
			console.log("valide")
			return true;
		} else {
			small.innerHTML = "Veuillez entrer un nom de famille valide";
			small.style.color = "red";
			console.log("non valide")
			return false; 
		};
	};
	// écoute des modifications sur input lastName
	lastName.addEventListener("change", () => {
		validLastName(lastName);
	});

	//-----------------------validation address------------------------
	function validAddress(address) {
		let addressRegex = new RegExp('^[0-9A-Za-zéèê \-]{2,30}$', 'g');
		let testaddressRegex = addressRegex.test(address.value);
		console.log(testaddressRegex);
		let small = address.nextElementSibling;
		if (testaddressRegex) {
			small.innerHTML = "Votre adresse est valide";
			small.style.color ="green";
			console.log("valide")
			return true;
		} else {
			small.innerHTML = "Veuillez entrer une adresse valide";
			small.style.color = "red";
			console.log("non valide")
			return false;
		}
	};
	// écoute des modifications sur input address
	address.addEventListener("change", () => {
		validAddress(address);
	});

	//-----------------------validation city------------------------
	function validCity(city) {
		let cityRegex = new RegExp('^[0-9A-Za-zéèê \-]{2,30}$', 'g');
		let testcityRegex = cityRegex.test(city.value);
		console.log(testcityRegex);
		let small = city.nextElementSibling;
		if (testcityRegex) {
			small.innerHTML = "Votre ville est valide";
			small.style.color = "green";
			console.log("valide")
			return true;
		} else {
			small.innerHTML = "Veuillez entrer une ville valide";
			small.style.color = "red";
			console.log("non valide")
			return false;
		}
	};
	// écoute des modification sur input city
	city.addEventListener("change", () => {
		validCity(city);
	});

	//-----------------------validation email------------------------
	function validEmail(email) {
		let emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
		let testemailRegex = emailRegex.test(email.value);
		console.log(testemailRegex);
		let small = email.nextElementSibling;
		if (testemailRegex) {
			small.innerHTML = "Votre email est valide";
			small.style.color = "green";
			console.log("valide")
			return true;
		} else {
			small.innerHTML = "Veuillez entrer un email valide";
			small.style.color = "red";
			console.log("non valide")
			return false;
		}
	};
	// écoute des modification sur input email
	email.addEventListener("change", () => {
		validEmail(email);
	});


	//-----------------------POST------------------------
	// écouter la soumission du formulaire
	document.getElementById("formValidation").addEventListener('click', (event) => {
    event.preventDefault();
    console.log("ok");
    if (validFirstName(firstName), validLastName(lastName), validAddress(address), validCity(city)!= true) {
        event.preventDefault();
        alert("Désolé un champ du formulaire n'est pas valide");
    };
    // création du tableau products qui recevra les ID 
    let products = [];
    console.log(products);
    for (let eachId of storedCart) {
        products.push(eachId.id);
    };
    console.log(products);

    let contact = new Contacts(firstName.value, lastName.value, address.value, city.value, email.value);
    console.log(contact);
    // objet qui contient l'objet contact et le tableau products attendu sur le serveur
    let data = JSON.stringify({contact, products});
    console.log(data);
    //vide le panier
    localStorage.clear();


    // Créer une requête de type "POST"
    let ajax = new Ajax;
    ajax.request('POST', 'http://localhost:3000/api/teddies/order', data).then(response => {
    	console.log(response.json());
    });
   

});