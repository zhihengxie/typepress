/// <reference path="./typing/mongoose/mongoose.d.ts" />
/// <reference path="./typing/moment/moment.d.ts" />
/// <reference path="./typing/q/q.d.ts" />
var mongoose = require("mongoose");
var Q = require("q");

var Schema = mongoose.Schema;


var userSchema = new Schema({
    name: String,
    password: String,
    role: { type: Number, min: 0, max: 2 }
});

(function (Role) {
    Role[Role["Administrator"] = 0] = "Administrator";
    Role[Role["User"] = 1] = "User";
    Role[Role["LimitedUser"] = 2] = "LimitedUser";
})(exports.Role || (exports.Role = {}));
var Role = exports.Role;

// User & View models
exports.User = mongoose.model("User", userSchema);

exports.db = mongoose.connection;

function connect(host, port, dbName, user, password) {
    var deferred = Q.defer();
    var str = getConnectionString(host, port, dbName, user, password);

    exports.db.on("error", function (err) {
        return deferred.reject(err);
    });
    exports.db.once("open", function () {
        return deferred.resolve(null);
    });

    mongoose.connect(str);
    return deferred.promise;
}
exports.connect = connect;

function getConnectionString(host, port, dbName, user, password) {
    var authenticationExtension = "";
    if (!!user && !!password) {
        authenticationExtension = user + ":" + password + "@"; //?TODO: Escape?
    }

    /*
    mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
    */
    return "mongodb://" + authenticationExtension + host + ":" + port.toString() + "/" + dbName;
}

function disconnect() {
    exports.db.close();
}
exports.disconnect = disconnect;
//# sourceMappingURL=db.js.map
