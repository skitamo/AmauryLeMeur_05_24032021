class Product {

	displayProduct(response) {

		const product = document.getElementById("product");
		const title = document.createElement("h1");
		const contain = document.createElement("div");
		const photo = document.createElement("div");
		const picture = document.createElement("img");
		const info = document.createElement("div");
		const username = document.createElement("p");
		const description = document.createElement("div");
		const form = document.createElement("form");
		const formGroupOption = document.createElement("div");
		const labelChoice = document.createElement("label");
		const select = document.createElement("select");
		const formGroupQuantity = document.createElement("div");
		const labelQuantity = document.createElement("label");
		const quantity = document.createElement("input");
		const small = document.createElement("small");
		const price = document.createElement("div");
		const grossPrice = document.createElement("div");
		const blockButton = document.createElement("div");
		const addToCart = document.createElement("a");

		product.appendChild(title);
		product.appendChild(contain);
		contain.appendChild(photo);
		photo.appendChild(picture);
		contain.appendChild(info);
		info.appendChild(username);
		info.appendChild(description);
		info.appendChild(form);
		form.appendChild(formGroupOption);
		formGroupOption.appendChild(labelChoice);
		labelChoice.appendChild(select);
		formGroupOption.appendChild(select);
		form.appendChild(formGroupQuantity);
		formGroupQuantity.appendChild(labelQuantity);
		formGroupQuantity.appendChild(quantity);
		form.appendChild(price);
		form.appendChild(grossPrice);
		form.appendChild(blockButton);
		blockButton.appendChild(addToCart);

		title.classList.add("text-center", "degrade");
		title.setAttribute("id", "productName");
		contain.classList.add("row", "justify-content-center", "my-5");
		photo.classList.add("col-md-8");
		picture.setAttribute("src", response.imageUrl, "id", "productPicture");
		picture.classList.add("d-block", "w-100", "border-dark", "rounded", "shadow-lg");
		username.setAttribute("id", "productID");
		username.classList.add("text-center", "mt-3", "mt-md-0", "font-weight-bold");
		info.classList.add("col", "mt-3", "ml-1");
		description.classList.add("text-left", "my-5");
		form.setAttribute("id", "commandForm");
		labelChoice.setAttribute("for", "option");
		select.classList.add("form-control");
		labelQuantity.setAttribute("for", "option");
		labelQuantity.classList.add("mt-3");
		quantity.setAttribute("name", "quantity", "type", "text", "id", "productQuantity");
		quantity.classList.add("form-control");
		price.setAttribute("id", "productPrice");
		price.classList.add("font-weight-bold", "mt-3");
		grossPrice.setAttribute("id", "grossPrice");
		grossPrice.classList.add("d-none");
		blockButton.classList.add("text-center");
		addToCart.setAttribute("id", "addToCart", "href", "cart.html");
		addToCart.classList.add("btn", "btn-outline-danger", "mt-5");

		title.innerHTML = response.name;
		username.innerHTML = response._id;
		description.innerHTML = response.description;
		labelChoice.innerHTML = "Choix des option";
		labelQuantity.innerHTML = "Quantité";
		price.innerHTML = response.price / 100 + ",00 €";
		grossPrice.innerHTML = response.price;
		addToCart.innerHTML = "Ajouter au panier";

		// sélection des options avec le constructeur option()
		let options = response.colors;
		options.forEach(function (element, key) {
			select[key] = new Option(element, key);
		});

		//écoute de l'input quantity dans le formulaire
		quantity.addEventListener("change", () => {
			enterQuantity(quantity);
		});

		//Regex pour l'input quantity
		function enterQuantity(quantity) {
			let quantityRegex = new RegExp('^[0-9]+$');
			//test de la regex
			let testQuantityRegex = quantityRegex.test(quantity.value);
			if (testQuantityRegex) {
				small.innerHTML = "Valide";
				small.style.color = "green";
				return (1);
			} else {
				small.innerHTML = "Non valide : veuillez entrez un nombre !";
				small.style.color = "red";
				return (0);
			}
		}
	

	// évènement ajout au panier
	addToCart.addEventListener("click", (event) => {
	//contrôle de la quantité pour valider l'ajout au panier et passer à la page suivante
		if(!quantity.value.match('^[0-9]+$') || quantity.value.match('^[0]$')) {
			event.preventDefault();
			alert("veuillez entrez un nombre pour passer à la suite !");
			localStorage.remove('Basket', item.id)
		}
		// déclarer l'objet
		let object = {
			id: response._id,
			quantity: parseInt(quantity.value)
		};

		// création d'une variable contenant un tableau vide
		let tab = []
		// récupération de la chaîne dans une variable	
		var BasketStore = JSON.parse(localStorage.getItem('Basket'));
		console.log(BasketStore)
		// si le localStorage contient quelque chose
		if (BasketStore !== null) {
			tab = BasketStore;
		}

		let itemExist = false;
		tab.forEach(item => {
			if (item.id === object.id) {
				itemExist = true;
				item.quantity += parseInt(object.quantity);
				console.log(item, object.quantity);
			}
		});

		if (!itemExist) {
			tab.push(object); 
		}
				
		//local storage sauvegarde le tableau sous forme de chaîne
		localStorage.setItem('Basket', JSON.stringify(tab));
	});
}
}