"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const AddMessage = require("./add-message");
admin.initializeApp(functions.config().firebase);
exports.addMessage = AddMessage.listener;
//# sourceMappingURL=index.js.map