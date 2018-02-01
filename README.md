# bamazon
A command line application using a MySQL database.

This application allows users to "order" a specific product from a database and a quantity.  Once their "order" is placed, "inventory" is updated in our database.  If there is not enough product in inventory the user is prompted to order again.

Users run the application by running `node bamazonCustomer.js`

![Image of Opening](https://github.com/surmackc/bamazon/blob/master/screenshots/open-app.png)

Choose a product to order:

![Image of Order](https://github.com/surmackc/bamazon/blob/master/screenshots/what-to-order.png)

Select a Quantity:

![Quantity to Order](https://github.com/surmackc/bamazon/blob/master/screenshots/quantity.png)

Completed Order:

If there is enough inventory then your order will be complete and your total will be displayed.  The database will also automatically update as you can see in the two screenshots where pens went from 500 to 450.

![Completed Order](https://github.com/surmackc/bamazon/blob/master/screenshots/completed-order.png)

Table Start:
![Table Start](https://github.com/surmackc/bamazon/blob/master/screenshots/products-table.png)

Table End:
![Table End](https://github.com/surmackc/bamazon/blob/master/screenshots/updated-inventory.png)

If there is not enough inventory to complete the orde the user is prompted to order again.
![Not enough inventory](https://github.com/surmackc/bamazon/blob/master/screenshots/not-enough-inventory.png)

