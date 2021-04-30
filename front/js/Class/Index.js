class Index {

	displayItems(response) {
		//boucle pour que ça marche pour chaques items présent dans l'API
		response.forEach(teddy => {

		const product = document.getElementById("product");
		const col = document.createElement("div");
		const card = document.createElement("div");
		const imgCardTop = document.createElement("div");
		let image = document.createElement("img");
		const cardBody = document.createElement("div");
		const cardTitle = document.createElement("h2");
		const cardText = document.createElement("p");
		const link = document.createElement("a");

		product.appendChild(col);
		col.appendChild(card);
		card.appendChild(imgCardTop);
		imgCardTop.appendChild(image);
		card.appendChild(cardBody);
		cardBody.appendChild(cardTitle);
		cardBody.appendChild(cardText);
		cardBody.appendChild(link);

		col.classList.add("col-lg-6");
	    card.classList.add("card", "border-dark", "shadow-lg", "my-3");
	    imgCardTop.classList.add("imgCardTop");
	    image.classList.add("d-block", "w-100");
	    cardTitle.classList.add("card-title");
	    cardBody.classList.add("card-body");
	    cardText.classList.add("card-text");
	    link.classList.add("btn", "btn-outline-danger");

	    image.setAttribute("width", "350");
	    image.setAttribute("src", teddy.imageUrl);
	    link.setAttribute("href", "front/html/product.html?id=" + teddy._id);

		cardTitle.innerHTML = teddy.name;
		cardText.innerHTML = teddy.description;
		link.innerHTML = teddy.price / 100 + ",00 €";
		image.src = teddy.imageUrl;
	});
	};
};