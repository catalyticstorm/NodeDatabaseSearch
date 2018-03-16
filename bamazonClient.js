// JavaScript Document

var mysql = require("mysql");
var inquirer = require("inquirer");
var productList = [];
var productQTYs = [];

console.log("BAMAZON CLIENT");
console.log("All of the items are based on Home Depot Items and Store SKU's.");
console.log("");
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
//		console.log(result);
		for (var i = 0; i < result.length; i++) {
//			console.log("SKU: " + result[i].item_id + " | PDCT: " + result[i].product_name + " | DPT: " + result[i].department_name + " | PC: $" + result[i].price + " | QTY AVAIL: " + result[i].stock_quantity);
			console.log("");
			console.log("====================================");
			console.log("");
			console.log("SKU #: " + result[i].item_id);
			console.log("PRDCT: " + result[i].product_name);
			console.log("DEPMT: " + result[i].department_name);
			console.log("PRICE: " + result[i].price);
			console.log("QOH #: " + result[i].stock_quantity);
			console.log("");
			console.log("====================================");
			productList.push(result[i].product_name);
			productQTYs.push(result[i].stock_quantity);
		}
//		connection.destroy();
		inquirer.prompt([
			{
				name: "whatIDo",
				type: "list",
				message: "What do you want to buy?",
				choices: productList
			},
			{
				name: "HowMany",
				type: "input",
				message: "How Many?"
			}
		])
		.then(function(resp) {
			console.log("You want " + resp.HowMany + " of " + resp.whatIDo + ".");
			var indexer = resp.whatIDo;
			var itemIndex = productList.indexOf(indexer);
			var itemCost = result[itemIndex].price;
			var storeQTYIndex = result[itemIndex].stock_quantity;
			var multiplier = parseInt(resp.HowMany);
			var itemTotal = itemCost * multiplier;
			var bringTableDown = storeQTYIndex - multiplier;
			console.log("They are $" + itemCost + " per/.");
			console.log("This will cost $" + itemTotal + ".");
			console.log("");
			console.log("Now checking to see if the store has enough...");
			if (storeQTYIndex < multiplier) {
				console.log("");
				console.log("Too bad. They don't have enough.");
				connection.destroy();
			}
			else {
				console.log("");
				console.log("Good news! We have enough!");
				console.log("Now communicating with the store database...");
				console.log("");
				var calzone = "UPDATE `bamazon`.`products` SET `stock_quantity`='" + bringTableDown + "' WHERE `product_name`='" + indexer + "'";
				connection.query(calzone, function(err, result, fields) {
					if (err) throw err;
					console.log("Your order is complete.");
					connection.destroy();
				});
			}
		});
	});
});
