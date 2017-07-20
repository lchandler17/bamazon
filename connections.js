const MySQL = require('mysql');
const Promises = require('bluebird');

Promises.promisifyAll(require("mysql/lib/Connection").prototype);
Promises.promisifyAll(require("mysql/lib/Pool").prototype);

var connection = MySQL.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "bamazon"
});

connection.connect(function(err){
	if( err ) throw err;

	// console.log("Connected as ID " + connection.threadId);
});

module.exports = connection;