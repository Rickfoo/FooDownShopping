// Routing to find all item master
exports.getHomeShoppingList = function(req,res,shoppingListProvider){
	shoppingListProvider.findAll(function(error, docs){
    	res.render('shopping_list.jade',{ title: 'Shopping List', lists:docs});
  	})
};

// Routing to add an item master
exports.getAddShoppingList = function(req,res){
    res.render('item_master_create.jade',{ title: 'New Item Master'});
};

// Routing to find by item_id from the item master
exports.getUpdateShoppingList = function(req,res,shoppingListProvider){
	shoppingListProvider.findById(req.params.id,function(error, docs){
    	res.render('item_master_update.jade',{ title:'Update Item Master', items:docs});
  	})
}
// Routing to delete and item master
exports.getDeleteShoppingList = function(req,res,shoppingListProvider){
  shoppingListProvider.delete(req.params.id,function(error){
    res.redirect('/shopping/item_master');
  })
}

// Routing to update/save an item master
exports.postSaveShoppingList = function(req,res,shoppingListProvider){
	shoppingListProvider.update(req.param('item_id'),{
	        description: req.param('description'),
	        aisle: req.param('aisle'),
	        price: req.param('price'),
	    }, function( error, docs) {
	        res.redirect('/shopping/item_master')
    });
}

// Routing to create a new item master
exports.postAddShoppingList = function(req,res,shoppingListProvider){
	 shoppingListProvider.insert({
	        description: req.param('description'),
	        aisle: req.param('aisle'),
	        price: req.param('price'),
	    }, function( error, docs) {
	        res.redirect('/shopping/item_master')
    });
}

