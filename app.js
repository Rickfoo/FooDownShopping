
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();
var ItemMasterProvider = require('./itemmasterprovider').ItemMasterProvider;
//--------------------------------------------------------------------------
//      EXPRESS SETUP
//--------------------------------------------------------------------------
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// Error Handling
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

// Initialize the micropostProvider
var itemMasterProvider = new ItemMasterProvider();

//--------------------------------------------------------------------------
//      ROUTING
//--------------------------------------------------------------------------

app.get('/', function(req, res){
 itemMasterProvider.findAll(function(error, docs){
    res.render('index.jade',{ title: 'Item Master', items:docs});
  })
});

// Get the Item Master
app.get('/shopping/item_master/add', function(req, res) {
    res.render('item_master_create.jade', { 
        title: 'New Item Master'});
});

// Update the Item Mster
app.get('/shopping/item_master/update/:id', function(req, res) {
  itemMasterProvider.findById(req.params.id,function(error, docs){
    res.render('item_master_update.jade',{ title:'Update Item Master', items:docs});
  })
});

// Delete the Item Mster
app.get('/shopping/item_master/delete/:id', function(req, res) {
  itemMasterProvider.delete(req.params.id,function(error){
    res.redirect('/');
  })
});

//---------------------------------------------------
//    POST - UPDATE/ADD MASTER ITEM
//---------------------------------------------------
// Create an Item Master
app.post('/shopping/item_master/add', function(req, res){
    itemMasterProvider.insert({
        description: req.param('description'),
        aisle: req.param('aisle'),
        price: req.param('price'),
    }, function( error, docs) {
        res.redirect('/')
    });
});

// Update an Item Master
app.post('/shopping/item_master/save', function(req, res){
    itemMasterProvider.update(req.param('item_id'),{
        description: req.param('description'),
        aisle: req.param('aisle'),
        price: req.param('price'),
    }, function( error, docs) {
        res.redirect('/')
    });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
