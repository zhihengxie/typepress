///<reference path="./typing/node/node.d.ts" />
///<reference path="./providers/db.ts" />
///<reference path="./config/initialization/index.ts" />
//
var db = require("./providers/db");
var config = require("./config/initialization/index");
db.connect(config.host, config.port, config.dbName);

db.User.create({
    "sd": ""
}, function (err, entry) {
    console.log(entry.active);
});

db.User.find({}, function (err, users) {
    if (err)
        throw err;
    else {
        users.forEach(function (entry) {
            console.log(entry.password);
        });
    }
});
//# sourceMappingURL=app.js.map
