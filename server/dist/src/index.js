"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var socket_1 = require("./socket");
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
var server = http_1.default.createServer(app);
var port = 8080;
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
}));
app.use("/", express_1.default.static("build"));
server.listen(port, function () { return console.log("Listening on port ".concat(port)); });
(0, socket_1.startSocketServer)(server);
