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
            name: "choice",
            type: "input",
            choices: function(){
                var choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                    choiceArray.push(results[i])
                }
                choiceArray.forEach( (choiceArray) => {
                    console.log(`Id: ${choiceArray.item_id}  Name: ${choiceArray.product_name}  Price: ${choiceArray.price}`);
                  });
                return choiceArray;
            },
            message: "What would you like to purchase (use ID)?"
        }
    ])
    .then (function(answer) {
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
            if (results[i].item_id === answer.choice) {
                chosenItem = results[i];
                               
            }
            console.log(answer.choice); 
        }
            
          
        
    })
})
};



