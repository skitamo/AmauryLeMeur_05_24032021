const ajax = new Ajax;
const product = new Index;
ajax.request("GET", "http://localhost:3000/api/teddies").then(response => {
	product.displayItems(response);
});