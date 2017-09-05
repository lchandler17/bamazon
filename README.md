# Bamazon

Node application that allows the user to either "purchase" an item as a customer, or manage inventory as a manager.

### Prerequisites

```
npm install bluebird inquirer mysql
```

## Getting Started

Initiate database and table in MySQLWorkbench using the [seeds provided](https://github.com/lchandler17/bamazon/blob/master/bamazon.sql), and install required Node packages.

HOW TO: bamazonCustomer.js

To use bamazonCustomer.js, enter ```node bamazonCustomer.js``` into terminal and await prompt. If the item you have selected is available in the quantity specified, your transaction will be completed and the SQL database updated. If the quantity requested is greater than the quantity available, you will receive an error message.

Please reference [tutorial video](https://github.com/lchandler17/bamazon/blob/master/bamazonCustomer-tutorial720.mov).

---

HOW TO: bamazonManager.js

Enter ```node bamazonManager.js``` into terminal and await prompt. Use the up and down arrows to scroll through the actions, and hit enter to select an action.  Then follow the subsequent prompts.  

Please reference [tutorial video](https://github.com/lchandler17/bamazon/blob/master/bamazonManager-tutorial720.mov).