var inquirer = require("inquirer");
var connection = require('./connections.js');


connection.queryAsync("SELECT * FROM products").then( data => data.forEach(item => console.log(
	"Product ID: " + item.item_id + 
	" // Product: " + item.product_name + 
	" // Price: $" + item.price) ) )
.then( () => {
	inquirer.prompt([
		{
		  name: 'whatNumber',
		  message: "What's the ID number of the item you'd like to purchase?",
		  type: 'input'
		}, 
		{
		  name: 'howMany',
		  message: "How many of this item would you like to purchase?",
		  type: 'input'
		} 
	]).then( (data) => {
		var howMany = data.howMany;
		var whatNumber = data.whatNumber;
		var stock = "";
		var price = "";

		if( ! data ){
			console.log("Whoah, something failed.");
			return;	
		} 
		else {
			connection.queryAsync("SELECT * FROM products").then( data => {

				item = data.map( item => {
					return {
						name : `Product ID: ${item.item_id}  Product: ${item.product_name} Price: ${item.price}`,
						item_id: item.item_id,
						product: item.product_name,
						price : item.price,
						stock: item.stock_qty
					}
				})

				stock = item[whatNumber-1].stock;
				price = item[whatNumber-1].price;
			
				if( howMany > stock ) {
					console.log("We're sorry, there's not enough of that item in stock.");
					connection.end();
				}

				else if (howMany <= stock ) {
					var total = howMany * price;
					var newStock = stock - howMany;

					connection.queryAsync("UPDATE products SET stock_qty = ? WHERE item_id = ?", [newStock, whatNumber])
					.then( () => { 
						console.log(`Purchase completed.  Your total is ${total} dollars.`)
						connection.end();
					})
					.catch( err => { throw err });
				}
			})
		}	
	});
});

