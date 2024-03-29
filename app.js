
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

// Routing initialization
var itemMaster = require('./routes/item_master');
var shoppingList = require('./routes/shopping_list');
// Modules initialization
var app = express();
var ItemMasterProvider = require('./itemmasterprovider').ItemMasterProvider;
var ShoppingListProvider = require('./shoppinglistprovider').ShoppingListProvider;

//--------------------------------------------------------------------------
//      EXPRESS SETUP
//--------------------------------------------------------------------------
app.configure(function(){
  app.set('port', process.env.PORT || 3100);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(function(err, req, res, next){
     res.status(err.status || 500);
     res.render('error', { error: err });
  });
});

app.configure('development', function(){
  //app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
  app.use(express.errorHandler());
});

// Initialize the micropostProvider
var itemMasterProvider = new ItemMasterProvider();
var shoppingListProvider = new ShoppingListProvider();

var io = require('socket.io').listen(http.createServer(app));
//=============================================================================
//    SOCKETS CREATION
//=============================================================================
io.sockets.on('connection', function (socket) {

    socket.on('addNewPersonMessage', function (data) {
        // console.log("addNewPersonMessage recieved person (email:'" + data.email + "')");

        // personProvider.save({
        //     email: data.email
        // }, function (error, docs) {
        //     if(error == null) {
        //         console.log('Sucessfully saved new person');
        //         console.log(docs[0]);
        //         io.sockets.emit('newPersonCallback', { _id: docs[0]._id, email: docs[0].email });
        //     } 
        // });
    });


    socket.on('addNewLinkMessage', function (data) {
        // console.log("addNewLinkMessage recieved link (source:'" + data.source + "', target:'" + data.target + "')");
        // linkProvider.save({
        //     source: data.source,
        //     target: data.target
        //  }, function (error, docs) {
        //     if(error == null) {
        //         console.log('Sucessfully saved new link');
        //         console.log(docs[0]);
        //         io.sockets.emit('newLinkCallback', { _id: docs[0]._id, source: docs[0].source, target: docs[0].target });
        //     } 
        // });
    });
});

//=============================================================================
//      ROUTING HOME
//=============================================================================

app.get('/', function(req, res){
    res.render('login.jade',{ title: 'Login'});
});

//=============================================================================
//      ROUTING SHOPPING LIST
//=============================================================================

app.get('/shopping/shopping_list', function(req, res){
  shoppingList.getHomeShoppingList(req,res,shoppingListProvider);
});

// Get the Item Master
app.get('/shopping/shopping_list/add', function(req, res) {
   itemMaster.getAddItemMaster(req,res);
});

// Update the Item Mster
app.get('/shopping/shopping_list/update/:id', function(req, res) {
  itemMaster.getUpdateItemMaster(req,res,itemMasterProvider);
});


//---------------------------------------------------
//    POST - UPDATE/ADD SHOPPING LIST
//---------------------------------------------------
// Create a shopping list item
app.post('/shopping/shopping_list/add', function(req, res){
    shoppingList.postAddShoppingList(req,res,shoppingListProvider);
});

// Update a shopping list item
app.post('/shopping/shopping_list/save', function(req, res){
    shoppingList.postSaveShoppingList(req,res,shoppingListProvider);
});


//=============================================================================
//      ROUTING ITEM MASTER
//=============================================================================

app.get('/shopping/item_master', function(req, res){
  itemMaster.getHomeItemMaster(req,res,itemMasterProvider);
});
// Get the Item Master
app.get('/shopping/item_master/add', function(req, res) {
   itemMaster.getAddItemMaster(req,res);
});

// Update the Item Mster
app.get('/shopping/item_master/update/:id', function(req, res) {
  itemMaster.getUpdateItemMaster(req,res,itemMasterProvider);
});

// Delete the Item Mster
app.get('/shopping/item_master/delete/:id', function(req, res) {
  itemMaster.getDeleteItemMaster(req,res,itemMasterProvider);

});

//---------------------------------------------------
//    POST - UPDATE/ADD MASTER ITEM
//---------------------------------------------------
// Create an Item Master
app.post('/shopping/item_master/add', function(req, res){
    itemMaster.postAddItemMaster(req,res,itemMasterProvider);
});

// Update an Item Master
app.post('/shopping/item_master/save', function(req, res){
    itemMaster.postSaveItemMaster(req,res,itemMasterProvider);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
