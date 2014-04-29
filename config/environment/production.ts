///<reference path="./../../typing/node/node.d.ts" />
///<reference path="./config.ts" />
import Config = require("./config");
var config = new Config();
config.port ="27017";
config.host ="http://www.live-web-host.xxx";
export = config;