///<reference path="./typing/node/node.d.ts" />
///<reference path="./providers/db.ts" />
///<reference path="./config/initialization/index.ts" />
//

import db = require("./providers/db");
import config = require("./config/initialization/index");
db.connect(config.host, config.port, config.dbName);


db.User.create({
        "sd": ""
    },
    function (err, entry:db.IUser) {
        console.log(entry.active);

    });

db.User.find({}, (err, users:db.IUser[]) => {

    if (err)
        throw err;
    else {
        users.forEach((entry)=> {
            console.log(entry.password)
        });
    }

});