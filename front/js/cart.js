// récupération du local storage
	const storedCart = JSON.parse(localStorage.getItem('Basket'));
// déclaration d'un tableau pour le calcul de la somme totale du panier
	let arrayTotalPriceItem = [];

// boucle du localStorage pour récupérer chaque article individuellement
	for (let cartUnit of storedCart) {
		cartUnit.quantity = parseInt(cartUnit.quantity);
		// console.log(cartUnit.quantity)

		// requête serveur pour accéder aux informations
		let request = new XMLHttpRequest();
		request.onreadystatechange = function () {
			if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
				let response = JSON.parse(this.responseText);

				// mise en place de la structure HTML
				const mainCart = document.getElementById("cart");
				const cartRow = document.createElement("div");
				const cartTitle = document.createElement("h1");
				const cartContainer = document.createElement("div");
				const cartPicture = document.createElement("div");
				const cartImage = document.createElement("img");
				const cartInfo = document.createElement("div");
				const cartName = document.createElement("div");
				const cartID = document.createElement("div");
				const cartUnitPrice = document.createElement("div");
				const cartPrice = document.createElement("div");
				const cartQuantity = document.createElement("div");
				const cartTotalPrice = document.createElement("div");
				const cartFinalPriceContainer = document.getElementById("finalPriceContainer");
				const cartFinalPrice = document.getElementById("finalPrice");

				mainCart.appendChild(cartRow);
				cartRow.appendChild(cartTitle);
				mainCart.appendChild(cartContainer);
				cartContainer.appendChild(cartPicture);
				cartPicture.appendChild(cartImage);
				cartContainer.appendChild(cartInfo);
				cartInfo.appendChild(cartName);
				cartInfo.appendChild(cartID);
				cartInfo.appendChild(cartUnitPrice);
				cartInfo.appendChild(cartPrice);
				cartInfo.appendChild(cartQuantity);
				cartInfo.appendChild(cartTotalPrice);

				cartTitle.classList.add("text-center", "degrade");
				mainCart.classList.add("container", "justify-content-center");
				cartContainer.classList.add("row", "mt-5", "col");
				cartPicture.classList.add("col-6", "col-md-4");
				cartImage.setAttribute("src", response.imageUrl);
				cartImage.classList.add("d-block", "w-100", "rounded", "shadow-lg");
				cartInfo.classList.add("col-md-8", "col", "bg-light", "rounded", "shadow-lg");
				cartName.classList.add("font-weight-border", "col", "mt-3");
				cartID.classList.add("font-weight-border", "col", "mt-3");
				cartUnitPrice.classList.add("d-none");
				cartPrice.classList.add("font-weight-border", "col", "mt-3");
				cartQuantity.classList.add("font-weight-border", "col", "mt-3");
				cartTotalPrice.classList.add("font-weight-border", "col", "text-right", "mt-3");

				// affiche l'article unitaire du panier
				cartName.innerHTML = "Nom du produit : " + response.name;
				cartPrice.innerHTML = "Prix : " + response.price / 100 + ",00 €";
				cartID.innerHTML = "Référence du produit : " + response._id;
				cartQuantity.innerHTML = "Quantité : " + cartUnit.quantity;
				cartUnitPrice.innerHTML = response.price;

				// mise en place de la fonction pour calculer le prix total de chaque article dans le panier
				function itemTotalPrice(number1, number2) {
					return number1 * number2;
				};
				let totalPriceItem = itemTotalPrice(cartUnitPrice.innerHTML, cartUnit.quantity)
				cartTotalPrice.innerHTML = "Prix TTC =" + totalPriceItem / 100 + ",00 €";

				// calcul de la somme totale du panier
				// push le prix total de chaque article dans un tableau déclaré en haut de la page
				arrayTotalPriceItem.push(totalPriceItem)
				let totalPriceAllItems = arrayTotalPriceItem.reduce(function (total, totalPriceItem) {
					return total + totalPriceItem;
				}, 0);
				// affiche le résultat du prix total du panier
				cartFinalPrice.innerHTML = "Montant total TTC = " + totalPriceAllItems / 100 + ",00 €";
				// envoi des données en local storage pour récupération sur la page confirmation
				sessionStorage.setItem("prixTotal", JSON.stringify(cartFinalPrice.innerHTML));
			};
	}
	request.open("GET", "http://localhost:3000/api/teddies/" + cartUnit.id);
	request.send();

	};