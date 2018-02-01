var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host:"localhost",
    port: 3306,

    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    start();
});

function start() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
    inquirer
        .prompt([
        {
            type: "input",
            name: "choice",
            choices: function(){
                var choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                    choiceArray.push(results[i])
                }
                choiceArray.forEach( (choiceArray) => {
                    console.log(`ID: ${choiceArray.item_id}  Name: ${choiceArray.product_name}  Price: $${choiceArray.price}`);
                  });
                return choiceArray;
            },
            message: "What would you like to purchase (use ID)?"
        },
        {
            type: "input",
            name: "quantity",
            message: "How many would you like to purchase?",
        }
    ])
    .then (function(answer) {
      var item = answer.item_id;
      var quantity = answer.quantity;
      

      connection.query(
        'SELECT * FROM products WHERE ?',
        [
            {
                item_id: item
            }
        ],
        function(err, data) {
        if (err) throw err;
        console.log(data);

        if (data.length === 0) {
            console.log('Error - Invalid ID');
            start();
        } else {
            var itemData = data[0];


            if (quantity <= itemData.stock_quantity) {
                console.log("Item is in stock.  Placing order.");
                var updateQueryString = 'UPDATE products SET stock_quantity = ' + (itemData.stock_quantity - quantity) + 'WHERE item_id = ' + item;

                connection.query(updateQueryString, function (err,data) {
                    if (err) throw err;

                    console.log('Your order is placed.  Your total is $' + itemData.price * quantity);
                    connection.end();
                })
             } else {
                 console.log("Sorry there is not enough inventory");
                 console.log('Please change your order.');
                 console.log("\n--------------------------------\n");
                 start();
             }
        }
      })
          
        
    })
})
};



