///<reference path="./../../typing/node/node.d.ts" />
///<reference path="./config.ts" />
var Config = require("./config");
var config = new Config();
config.port = "27017";
config.host = "localhost";
config.dbName = "typepress";
module.exports = config;
//# sourceMappingURL=development.js.map
