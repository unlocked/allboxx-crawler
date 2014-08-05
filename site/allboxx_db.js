/**
 * Created by max_tolstykh on 01/08/14.
 */
var mongoose = require('mongoose');
var db;

var User = {
    acc: String,
    name: String,
    phone: String,
    activated: Boolean,
    code: Number,
    messages: Array,
    operator: Boolean,
    cookie: String
};

var UserSchema;
var user; 
/**
 *
 * @param _user
 */
module.exports.save = function (_user) {
    if (this.user === undefined) {
        this.user = mongoose.model('User', UserSchema);
    }
    var u = new this.user(_user);
    console.log(u);
    u.save();
};

module.exports.save_collection = function (_collection) {
    for (var key in _collection) {        
        var u = new user(_collection[key]);
        u.save();
    }
};

module.exports.connect = function () {
    if (db === undefined) {
        mongoose.connect('mongodb://localhost/allboxx');
        db = mongoose.connection;
        UserSchema = mongoose.Schema(User);
    }
};

module.exports.findUser = function (userId, callback) {
    if (this.user === undefined) {
        this.user = mongoose.model('User', UserSchema);
    }          
    this.user.findOne({"acc": userId}, function(err, result){        
        callback(null, result);
        !err
            ? callback(null, result)
            : callback(true);
    });        
};

module.exports.users = function (callback) {  
    if (this.user === undefined) {
        this.user = mongoose.model('User', UserSchema);
    }          
    this.user.find(function(err, result){        
        callback(null, result);
        !err
            ? callback(null, result)
            : callback(true);
    });        
};


module.exports.disconnect = function () {
    mongoose.connection.close()
};