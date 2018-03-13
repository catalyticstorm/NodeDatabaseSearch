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
	password: "PUT PASSWORD HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
	database: "bamazon"
});

connection.connect(function(err) {
	if (err) {
		console.log("An error occured. Ending...");
		connection.destroy();
		console.log("Any connections have been terminated.");
		
	}
	console.log("Connected!");
	lookUpItem();
});

function lookUpItem(answer) {
	var query = "SELECT item_id, product_name, department_name, price, stock_quantity FROM products WHERE ?";
	
	connection.query(query, { product_name: answer.product_name }, function(err, res) {
		for (var i = 0; i < res.length; i++) {
			console.log("SKU: " + res[i].item_id + " | PDCT: " + res[i].product_name + " | DPT: " + res[i].department_name + " | PC: $" + res[i].price + " | QTY AVAIL: " + res[i].stock_quantity);
			productList.push(res[i].product_name);
		}
		runSearch();
	});
	
	inquirer.prompt({
		name: "action",
		type: "list",
		message: "What do you want to buy?",
		choices: productList
	})
	.then(function(answer) {
		buyItem();
	});
}

function buyItem() {
	inquirer.prompt({
		name: "buyAmt",
		type: "input",
		message: "How many do you want to buy? NUMBER ONLY"
	})
	.then(function(err) {
		if (err) {
			console.log("Error in Item Purchase. Terminating connection");
			connection.destroy();
			console.log("");
			
		}
		console.log("You want " + user.buyAmt + " " + "PLACE ITEM TAG HERE");
		console.log("");
		console.log("Placing order...");
		console.log("");
		console.log("Done! But I don't like it---")
		console.log("You have " + user.buyAmt + " " + "PLACE ITEM TAG HERE" + " coming to su casa.");
	})
}

connection.end(function(err) {
	console.log("Connection Ended. Thanks for fake-shopping with us.")
});