var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",
    password: "password1",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    // selecting everything from products table
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([{
                    type: "input",
                    name: "choice",
                    choices: function () {
                        var choiceArray = [];
                        // loops through all the results(products) and pushes data into array
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i])
                        }
                        // for each object in array we log the data
                        choiceArray.forEach(function (choiceArray) {
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
            .then(function (answer) {
                // setting variables for our user responses
                var item = answer.choice;
                var quantity = answer.quantity;


                connection.query(
                    //   selecting our specific product based on id
                    'SELECT * FROM products WHERE ?', [{
                        item_id: item
                    }],
                    function (err, data) {
                        if (err) throw err;

                        // making sure they entered a number
                        if (data.length === 0) {
                            console.log('Error - Invalid ID');
                            start();
                        } else {
                            // setting our variable for returned object based on entered item id
                            var itemData = data[0];
                            // checking our inventory levels
                            if (quantity <= itemData.stock_quantity) {
                                console.log("Item is in stock.  Placing order.");
                                // setting our query string to pass
                                var updateQueryString = 'UPDATE products SET stock_quantity = ' + (itemData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
                                // updates database quantity
                                connection.query(updateQueryString, function (err, data) {
                                    if (err) throw err;

                                    console.log('Your order for ' + itemData.product_name + "Your total is $" + itemData.price * quantity);
                                    connection.end();
                                })
                            } else {
                                console.log('\n--------------------------------\n');
                                console.log("Sorry there is not enough inventory");
                                console.log('Please change your order.');
                                console.log('\n--------------------------------\n');
                                start();
                            }
                        }
                    })


            })
    })
};