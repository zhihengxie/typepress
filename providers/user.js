/// <reference path="../typing/mongoose/mongoose.d.ts" />
/// <reference path="../typing/q/q.d.ts" />
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

(function (Role) {
    Role[Role["Admin"] = 0] = "Admin";
    Role[Role["Editor"] = 1] = "Editor";
    Role[Role["User"] = 2] = "User";
    Role[Role["Guest"] = 5] = "Guest";
})(exports.Role || (exports.Role = {}));
var Role = exports.Role;

var userSchema = new Schema({
    name: { type: String, required: true, unique: true, default: '' },
    photo: { type: String },
    emailSubscription: { type: Boolean, default: true },
    unreadMessages: { type: Number, default: 0 },
    activationCode: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'user' },
    active: { type: Boolean, default: false },
    firstLogin: { type: Boolean, required: false, default: true },
    birthDate: { type: Date },
    displayName: { type: String, required: true, default: '' },
    description: { type: String, default: '' },
    approved: { type: Boolean, required: false, default: false },
    createdAt: { type: Date, required: false, default: new Date() }
});

exports.User = mongoose.model("User", userSchema);
//# sourceMappingURL=user.js.map
