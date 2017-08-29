var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "root",

	password: "password",
	database:"bamazon"

});

connection.connect(function(err) {

if(err) throw err;
 selectOption();
});



////



function selectOption() {

	inquirer
    .prompt([

      {
        name: "select",
        type: "list",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
        message: "Select Option"
      },

 	]).then(function(answer) {
	
		connection.query('SELECT product_name, department_name, price, stock_quantity FROM products WHERE ?', {item_id: answer.item}, function(err,res) {

			
			if (answer.select === "View Products for Sale"){
				displayProducts();
	
			}

			else if (answer.select === "View Low Inventory") {
				lowInventory();


			}

			else if (answer.select === "Add to Inventory") {



			}

			else if (answer.select === "Add New Product") {



			}


			else {
			}

		})

	});

}

//connection.query('SELECT product_name, department_name, price, stock_quantity FROM products WHERE ?', {item_id: answer.item}, function(err,res) {


//
function displayProducts() {
 
 connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
	console.log(results);
 
 });

}
////
function lowInventory() {
 
  connection.query('SELECT product_name, department_name, price, stock_quantity FROM products WHERE stock_quantity < 5', function(err,res) {
    if (err) throw err;
	var quantity = res;
	console.log(quantity);

 
  });

}
////


function addInventory() {
	inquirer
    .prompt([

      {
        name: "item",
        type: "input",
        message: "Enter item ID"
      },


      {
        name: "quantity",
        type: "input",
        message: "How much would you like to add?"
      }

 	]).then(function(answer) {
 
connection.query('SELECT * FROM products WHERE ?', {item_id: answer.item}, function(err,res) {
    if (err) throw err;

    quantity = res[0].stock_quantity + parseInt(answer.quantity);
 
 connection.query("UPDATE products SET ? WHERE ?", [{ 
	

	stock_quantity: quantity  
},

{
	item_id: answer.id

}]function(err, results) {});

	}
 
 });

}
////
/*

function addProduct() {
 
connection.query('SELECT product_name, department_name, price, stock_quantity FROM products WHERE ?', {item_id: answer.item}, function(err,res) {
    if (err) throw err;


	}
 
 });

}*/



