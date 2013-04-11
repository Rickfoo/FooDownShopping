// Routing to find all item master
exports.getHomeItemMaster = function(req,res,itemMasterProvider){
	itemMasterProvider.findAll(function(error, docs){
    	res.render('item_master_list.jade',{ title: 'Item Master', items:docs});
  	})
};

// Routing to add an item master
exports.getAddItemMaster = function(req,res){
    res.render('item_master_create.jade',{ title: 'New Item Master'});
};

// Routing to find by item_id from the item master
exports.getUpdateItemMaster = function(req,res,itemMasterProvider){
	itemMasterProvider.findById(req.params.id,function(error, docs){
    	res.render('item_master_update.jade',{ title:'Update Item Master', items:docs});
  	})
}
// Routing to delete and item master
exports.getDeleteItemMaster = function(req,res,itemMasterProvider){
  itemMasterProvider.delete(req.params.id,function(error){
    res.redirect('/shopping/item_master');
  })
}

// Routing to update/save an item master
exports.postSaveItemMaster = function(req,res,itemMasterProvider){
	itemMasterProvider.update(req.param('item_id'),{
	        description: req.param('description'),
	        aisle: req.param('aisle'),
	        price: req.param('price'),
	    }, function( error, docs) {
	        res.redirect('/shopping/item_master')
    });
}

// Routing to create a new item master
exports.postAddItemMaster = function(req,res,itemMasterProvider){
	 itemMasterProvider.insert({
	        description: req.param('description'),
	        aisle: req.param('aisle'),
	        price: req.param('price'),
	    }, function( error, docs) {
	        res.redirect('/shopping/item_master')
    });
}

