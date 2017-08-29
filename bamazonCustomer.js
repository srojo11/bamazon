var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require('console.table');

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "root",

	password: "password",
	database:"bamazon"

});

connection.connect(function(err) {

if(err) throw err;
 displayProducts();
});


function displayProducts() {
 
 connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
	    //for (var i=0; i <results.length; i++) {
	       
	    //results[i] =  [results[i].item_id, results[i].product_name, results[i].department_name, '$'+ results[i].price, results[i].stock_quantity];

	            //}
//console.table(results);
	console.log(results);
	idNumber();

 
 });

}
////



function idNumber() {

	inquirer
    .prompt([

      {
        name: "item",
        type: "input",
        message: "What is the item number you would like to buy?"
      },

      {
      	name:"units",
		type:"input",
		message: "How many units would you like to buy?"
	  }	

 	]).then(function(answer) {
	
		connection.query('SELECT product_name, department_name, price, stock_quantity FROM products WHERE ?', {item_id: answer.item}, function(err,res) {

			console.log("you want to buy " + answer.units + " of the " + res[0].product_name + "." );
			
			if (answer.units <= res[0].stock_quantity){
				var quantity = res[0].stock_quantity - answer.units;
				connection.query("UPDATE products SET ? WHERE ?", [
				{
					stock_quantity: quantity
				},

				{
					item_id: answer.item

				}], function(err,res){	
						});

				var cost = res[0].price * answer.units;	
				console.log('Order Complete! Cost is $' + cost.toFixed(2))
				reset();

			}

			else {
				console.log('Out of Stock Brah!');
				reset();

			}

		})

	});

}

function reset() {
 
inquirer
    .prompt([

      {
        name: "select",
        type: "list",
        choices: ["YES", "NO"],
        message: "Continue Shopping?"
      },

 	]).then(function(answer) {

 connection.query("SELECT * FROM products", function(err, results) {

    if (answer.select === "YES"){
	displayProducts();

    }

    else {

    console.log("later dude");


    }
	
	
 
 });
});
}



	


		
		

