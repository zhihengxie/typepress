/// <reference path="../typing/mongoose/mongoose.d.ts" />
/// <reference path="../typing/q/q.d.ts" />

import mongoose = require("mongoose");
import Q = require("q");
var Schema = mongoose.Schema;

export enum Role {
    Admin = 0,
    Editor = 1,
    User = 2,
    Guest = 5
}

var userSchema = new Schema({
    name: {type: String, required: true, unique: true, default: ''},
    photo: {type: String},
    emailSubscription: {type: Boolean, default: true},
    unreadMessages: {type: Number, default: 0},
    activationCode: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true, default: 'user'},
    active: {type: Boolean, default: false},
    firstLogin: {type: Boolean, required: false, default: true},
    birthDate: {type: Date},
    displayName: {type: String, required: true, default: ''},
    description: {type: String, default: ''},
    approved: {type: Boolean, required: false, default: false},
    createdAt: {type: Date, required: false, default: new Date()}
});

export interface IUser extends  mongoose.Document {
    name: string;
    photo: string;
    emailSubscription: boolean;
    unreadMessages: number;
    activationCode: string;
    email: string;
    password: string;
    role: string;
    active:boolean;
    firstLogin: boolean;
    displayName: string;
    description: string;
    approved: boolean;
    birthDate: Date;
    createdAt: Date;
}

export var User = mongoose.model("User", userSchema);