//récupération de l'élément ID dans l'adresse
let url_string = window.location.href;
let url = new URL(url_string);
let id = url.searchParams.get("id");
console.log(id);

//connection à l'API et structure HTML
const ajax = new Ajax;
const product = new Product;
ajax.request("GET", "http://localhost:3000/api/teddies/" +id).then(response => {
	product.displayProduct(response);
});