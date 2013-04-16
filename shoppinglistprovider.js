/**
 * Module to select, update, delete item master to MySql..
*/ 
var mysql = require('mysql');
var pool = mysql.createPool({
 host:'localhost',
 user:'root',
 password:'admin',
 database:'shopping'});
 
// Constructor for ShoppingListProvider
ShoppingListProvider = function(){
};

// Function to find all the shopping
ShoppingListProvider.prototype.findAll = function(callback){
	pool.getConnection(function(err, connection) {
		// Use the connection
		connection.query( 'SELECT * from v_shopping_list', function(err, rows, fields) {
			if (err) callback(err);
			else {
				console.log(fields);
				callback(null,rows);
				connection.end();				
			}

		});
	});
};

// Function to find by Item ID the item master record
ShoppingListProvider.prototype.findById = function(itemId,callback){
	pool.getConnection(function(err, connection) {
		// Use the connection
		connection.query( 'SELECT * FROM shopping_list where item_id = ?',[itemId], function(err, rows) {
			if (err) callback(err);
			else {
				callback(null,rows);
				connection.end();				
			}

		});
	});
};

// Function to insert a new item master record
ShoppingListProvider.prototype.insert = function(req,callback){
	pool.getConnection(function(err, connection) {
		// Use the connection
		connection.query( 'INSERT INTO shopping_list SET ?',{item_desc:req.description,item_aisle: req.aisle,item_price:req.price}, function(err, result) {
			if (err) callback(err);
			else {
				callback(null,result.insertId);
				connection.end();				
			}

		});
	});
};

// Function to Update an item master record
ShoppingListProvider.prototype.update = function(itemId,req,callback){
	pool.getConnection(function(err, connection) {
		// Use the connection
		console.log(req);
		connection.query( 'UPDATE shopping_list SET ? WHERE item_id = ' + itemId, {item_desc:req.description,item_aisle: req.aisle,item_price:req.price}, function(err, result) {
			if (err) callback(err);
			else {
				callback(null,result.insertId);
				connection.end();				
			}

		});
	});
};

// Function to Delete an item master record
ShoppingListProvider.prototype.delete = function(itemId,callback){
	pool.getConnection(function(err, connection) {
		// Use the connection
		connection.query( 'DELETE FROM shopping_list WHERE item_id = ' + itemId, function(err, result) {
			if (err) callback(err);
			else {
				callback(null);
				connection.end();				
			}

		});
	});
};
exports.ShoppingListProvider = ShoppingListProvider; 
