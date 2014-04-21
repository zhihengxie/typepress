/// <reference path="./typing/mongoose/mongoose.d.ts" />
/// <reference path="./typing/moment/moment.d.ts" />
/// <reference path="./typing/q/q.d.ts" />

import fs = require("fs");
import path = require("path");
import mongoose = require("mongoose");
import Q = require("q");

var Schema = mongoose.Schema;


// collection "users":

export interface IUser extends mongoose.Document {
    name: string;
    password: string; //PBKDF2
    role: Role;
}

var userSchema = new Schema({
    name: String,
    password: String,
    role: { type: Number, min: 0, max: 2 }
});

export enum Role {
    Administrator = 0,
    User = 1,
    LimitedUser = 2
}


// User & View models
export var User = <mongoose.Model<IUser>>mongoose.model("User", userSchema);

export var db = mongoose.connection;

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