var inquirer = require("inquirer");
var connection = require('./connections.js');

run();

function run() {
  inquirer
    .prompt({
		name: "action",
		type: "list",
		message: "What would you like to do?",
		choices: [
			"View Products for Sale",
			"View Low Inventory",
			"Add to Inventory",
			"Add New Product"
		]
    })
    .then(function(answer) {
		switch (answer.action) {
		case "View Products for Sale":
		  viewProd();
		  break;

		case "View Low Inventory":
		  lowInv();
		  break;

		case "Add to Inventory":
		  addInv();
		  break;

		case "Add New Product":
		  addProd();
		  break;
		}
    });
}

function viewProd() {
	connection.queryAsync("SELECT * FROM products").then( data => data.forEach(item => console.log(
		"Product ID: " + item.item_id + 
		" // Product: " + item.product_name + 
		" // Price: $" + item.price + 
		" // Stock Qty: " + item.stock_qty) ) )
	.then( () => { 
		connection.end();
	})
	.catch( err => { throw err });
}

function lowInv() {
	connection.queryAsync("SELECT * FROM products").then( data => data.forEach(item => {
		if (item.stock_qty < 5) {
			console.log(
			"Product ID: " + item.item_id + 
			" // Product: " + item.product_name + 
			" // Price: $" + item.price + 
			" // Stock Qty: " + item.stock_qty);
		} } ) )
	.then( () => { 
		connection.end();
	})
	.catch( err => { throw err });
}

function addInv() {
	inquirer.prompt([
		{
		  name: 'addId',
		  message: "ID number of inventory item:",
		  type: 'input'
		}, 
		{
		  name: 'addQty',
		  message: "Qty to be added:",
		  type: 'input'
		} 
	]).then( (data) => {

		var addQty = parseInt(data.addQty);
		var addId = data.addId;

		connection.queryAsync("SELECT * FROM products").then( data => {
			item = data.map( item => {
				return {
					name : `Product ID: ${item.item_id}  Product: ${item.product_name} Price: ${item.price}`,
					item_id: item.item_id,
					product: item.product_name,
					price : item.price,
					stock: item.stock_qty
				}
			});

			// console.log("NOW:" + item[addId-1].stock);
			// console.log("ADD:" + addQty);

			var stock = item[addId-1].stock;
			var newStockQty = addQty + stock;

			connection.queryAsync("UPDATE products SET stock_qty = ? WHERE item_id = ?", [newStockQty, addId]).then( () => {
				console.log("Item #" + addId + " has been updated to qty " + newStockQty + ".");
				connection.end();
			})
		})
	})
	.catch( err => { throw err });
}

function addProd() {
	inquirer.prompt([
		{
		  name: 'addProd',
		  message: "Name of product:",
		  type: 'input'
		},
		{
		  name: 'addDept',
		  message: "Department of product:",
		  type: 'input'
		},
		{
		  name: 'addPrice',
		  message: "Price of product:",
		  type: 'input'
		}, 
		{
		  name: 'addQty',
		  message: "Qty to be added to inventory:",
		  type: 'input'
		}
	]).then( (data) => {

		connection.queryAsync("INSERT INTO products (product_name, department_name, price, stock_qty) VALUES (?, ?, ?, ?)", [data.addProd, data.addDept, data.addPrice, data.addQty])
		console.log("Product has been added.");

	}).then( () => {
		connection.end();
	})
	.catch( err => { throw err });
}
