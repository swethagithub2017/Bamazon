var mysql = require("mysql");
var inquirer = require("inquirer");
var prompt = require('prompt');
var Table = require('cli-table');
var setTimer;
var productPurchased = [];

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: 'root',
  password: 'root',
  database: "bamazon_db"
});


connection.connect(function(err) {
  if (err) throw err; 
  listAll();
});



function listAll(){
  connection.query("select * from products", function(err, res) {
  if (err) throw err;
  
  var table = new Table({
    head: ['item Id#', 'product Name', 'department','price'],
  });

  for (var i = 0; i < res.length; i++) {
      table.push(
        [res[i].id, res[i].product_name, res[i].department_name, "$"+res[i].price]
      );
    }
  console.log(table.toString());
  buy();
}); 


var purchase = function(){

  var productInfo = {
    properties: {
      itemID:{description: ('Please enter the ID # of the item you wish to buy!')},
      Quantity:{description: ('How many items would you like to buy?')}
     },
  }

  prompt.start();
  
  prompt.get(productInfo, function(err, res){


    var customerPurchase = {
      itemID: res.itemID,
      Quantity: res.Quantity
    };
    productPurchased.push(customerPurchase);
    


    connection.query('SELECT * FROM products WHERE id=?', productPurchased[0].itemID, function(err, res){
        if(err) console.log(err, 'the item ID doesn\'t exist');
        

        if(res[0].stock_quantity < productPurchased[0].Quantity){
          console.log('The product is out of stock!');
          connection.end();


        } else if(res[0].stock_quantity >= productPurchased[0].Quantity){

          console.log('');
          console.log(productPurchased[0].Quantity + ' items purchased');
          console.log(res[0].product_name + ' $' + res[0].price);
          
          var saleTotal = res[0].price * productPurchased[0].Quantity;
          console.log('Total: $' + saleTotal);
          
          newQuantity = res[0].stock_quantity - productPurchased[0].Quantity;
          
          

          connection.query("UPDATE products SET stock_quantity = " + newQuantity +" WHERE id = " + productPurchased[0].itemID, function(err, res){
            if(err) throw err;

            console.log('');
            console.log('Your order has been processed.  Thank you for shopping with us!');
            console.log('');

            connection.end();
          })
        }
      })
    })
  }
}
   