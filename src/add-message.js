"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/add-message/index.ts
const functions = require("firebase-functions");
const admin = require("firebase-admin");
exports.listener = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    const original = req.query.text;
    const snapshot = yield admin.database().ref('messages').push({ original: original });
    res.redirect(303, snapshot.ref);
}));
//# sourceMappingURL=add-message.js.map