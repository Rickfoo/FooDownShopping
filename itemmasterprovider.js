/**
 * Module to select, update, delete item master to MySql..
*/ 
var mysql = require('mysql');
var pool = mysql.createPool({
 host:'localhost',
 user:'root',
 password:'admin',
 database:'shopping'});
 
// Constructor for ItemMasterProvider
ItemMasterProvider = function(){
};

// Function to find all the item master
ItemMasterProvider.prototype.findAll = function(callback){
	pool.getConnection(function(err, connection) {
		// Use the connection
		connection.query( 'SELECT * FROM item_master', function(err, rows) {
			if (err) callback(err);
			else {
				callback(null,rows);
				connection.end();				
			}

		});
	});
};

// Function to find by Item ID the item master record
ItemMasterProvider.prototype.findById = function(itemId,callback){
	pool.getConnection(function(err, connection) {
		// Use the connection
		connection.query( 'SELECT * FROM item_master where item_id = ?',[itemId], function(err, rows) {
			if (err) callback(err);
			else {
				callback(null,rows);
				connection.end();				
			}

		});
	});
};

// Function to insert a new item master record
ItemMasterProvider.prototype.insert = function(req,callback){
	pool.getConnection(function(err, connection) {
		// Use the connection
		connection.query( 'INSERT INTO item_master SET ?',{item_desc:req.description,item_aisle: req.aisle,item_price:req.price}, function(err, result) {
			if (err) callback(err);
			else {
				callback(null,result.insertId);
				connection.end();				
			}

		});
	});
};

// Function to Update an item master record
ItemMasterProvider.prototype.update = function(itemId,req,callback){
	pool.getConnection(function(err, connection) {
		// Use the connection
		console.log(req);
		connection.query( 'UPDATE item_master SET ? WHERE item_id = ' + itemId, {item_desc:req.description,item_aisle: req.aisle,item_price:req.price}, function(err, result) {
			if (err) callback(err);
			else {
				callback(null,result.insertId);
				connection.end();				
			}

		});
	});
};

// Function to Delete an item master record
ItemMasterProvider.prototype.delete = function(itemId,callback){
	pool.getConnection(function(err, connection) {
		// Use the connection
		connection.query( 'DELETE FROM item_master WHERE item_id = ' + itemId, function(err, result) {
			if (err) callback(err);
			else {
				callback(null);
				connection.end();				
			}

		});
	});
};
exports.ItemMasterProvider = ItemMasterProvider; 
