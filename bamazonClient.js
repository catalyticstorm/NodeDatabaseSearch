// JavaScript Document

var mysql = require("mysql");
var inquirer = require("inquirer");
var productList = [];

console.log("BAMAZON CLIENT");
console.log("All of the items are based on Home Depot Items and Store SKU's.");

console.log("Establishing Connection...");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	// Your username
	user: "root",

	// Your password
	password: "Hypercam2",
	database: "bamazon"
});

connection.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
	connection.query("SELECT * FROM products", function(err, result, fields) {
		if (err) throw err;
		console.log(result);
		for (var i = 0; i < result.length; i++) {
			console.log("SKU: " + result[i].item_id + " | PDCT: " + result[i].product_name + " | DPT: " + result[i].department_name + " | PC: $" + result[i].price + " | QTY AVAIL: " + result[i].stock_quantity);
			productList.push(result[i].product_name);
		}
//		connection.release();
	});
	;
});

// item_id, product_name, department_name, price, stock_quantity

//function lookUpItem(result) {
//	getItems();
//	inquirer.prompt({
//		name: "action",
//		type: "list",
//		message: "What do you want to buy?",
//		choices: productList
//	})
//	.then(function(result) {
//		buyItem();
//	});
//}
//
//function buyItem() {
//	inquirer.prompt({
//		name: "buyAmt",
//		type: "input",
//		message: "How many do you want to buy? NUMBER ONLY"
//	})
//	.then(function(err) {
//		if (err) {
//			console.log("Error in Item Purchase. Terminating connection");
//			connection.destroy();
//			console.log("");
//			
//		}
//		console.log("You want " + user.buyAmt + " " + "PLACE ITEM TAG HERE");
//		console.log("");
//		console.log("Placing order...");
//		console.log("");
//		console.log("Done! But I don't like it---")
//		console.log("You have " + user.buyAmt + " " + "PLACE ITEM TAG HERE" + " coming to su casa.");
//	})
//}
//getItems();
//connection.end(function(err) {
//	console.log("Connection Ended. Thanks for fake-shopping with us.")
//});