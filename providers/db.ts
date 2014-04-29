/// <reference path="../typing/mongoose/mongoose.d.ts" />
/// <reference path="../typing/moment/moment.d.ts" />
/// <reference path="../typing/q/q.d.ts" />


import mongoose = require("mongoose");
import user = require("./user");

export var db = mongoose.connection;
export var User = user.User;
export interface IUser extends user.IUser{};

export function connect(host: string, port: number, dbName: string): Q.Promise<any>;
export function connect(host: string, port: number, dbName: string, user: string, password: string): Q.Promise<any>;
export function connect(host: string, port: number, dbName: string, user?: string, password?: string): Q.Promise<any> {
    var deferred = Q.defer();
    var str = getConnectionString(host, port, dbName, user, password);

    db.on("error", err => deferred.reject(err));
    db.once("open", () => deferred.resolve(null));

    mongoose.connect(str);
    return deferred.promise;
}

function getConnectionString(host: string, port: number, dbName: string, user: string, password: string): string {
    var authenticationExtension = "";
    if (!!user && !!password) {
        authenticationExtension = user + ":" + password + "@"; //?TODO: Escape?
    }
    /*
    mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
    */
    return "mongodb://" + authenticationExtension + host + ":" + port.toString() + "/" + dbName;
}

export function disconnect(): void {
    db.close();
}