var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

PersonProvider = function (host, port) {
    this.db = new Db('node-mongo-socketDemo', new Server(host, port, { safe:true, auto_reconnect: true }, {}));
    this.db.open(function () { });
};


PersonProvider.prototype.getCollectionSafe = function (callback) {
    this.db.collection('people', { safe: true }, function (error, person_collection) {
        if (error) callback(error);
        else callback(null, person_collection);
    });
};

PersonProvider.prototype.getCollection = function (callback) {
    this.db.collection('people', function (error, person_collection) {
        if (error) callback(error);
        else callback(null, person_collection);
    });
};

PersonProvider.prototype.findAll = function (callback) {
    this.getCollection(function (error, person_collection) {
        if (error) callback(error)
        else {
            person_collection.find().toArray(function (error, results) {
                if (error) callback(error)
                else callback(null, results)
            });
        }
    });
};


PersonProvider.prototype.findById = function (id, callback) {
    this.getCollection(function (error, person_collection) {
        if (error) callback(error)
        else {
            person_collection.findOne({ _id: person_collection.db.bson_serializer.ObjectID.createFromHexString(id) }, 
                function (error, result) {
                    if (error) callback(error)
                    else callback(null, result)
            });
        }
    });
};

PersonProvider.prototype.save = function (people, callback) {
    this.getCollection(function (error, person_collection) {
        if (error) callback(error)
        else {
            if (typeof (people.length) == "undefined")
                people = [people];

            person_collection.insert(people, function () {
                callback(null, people);
            });
        }
    });
};

exports.PersonProvider = PersonProvider;