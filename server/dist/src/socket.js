"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSocketServer = void 0;
var socket_io_1 = require("socket.io");
var Player;
(function (Player) {
    Player[Player["P1"] = 1] = "P1";
    Player[Player["P2"] = 2] = "P2";
    Player[Player["HACKER"] = 3] = "HACKER";
    Player[Player["NONE"] = -1] = "NONE";
})(Player || (Player = {}));
var lobbies = {};
var startSocketServer = function (server) {
    var io = new socket_io_1.Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
        },
    });
    io.on("connection", function (socket) {
        console.log("Connected socket " + socket.id);
        socket.on("disconnecting", function () {
            // Terminate games and disconnect all players if
            // disconnecting socket was participating
            console.log("Disconnecting socket " + socket.id);
            socket.rooms.forEach(function (room) {
                socket.leave(room);
                var session = lobbies[room];
                if (session) {
                    var index = session.indexOf(socket.id);
                    if (index !== -1)
                        session.splice(index, 1, "");
                    console.log("Session after disconnecting", lobbies[room]);
                }
            });
        });
        socket.on("join", function (code, callback) {
            console.log("join (code: " + code + ")");
            console.log("Session before joining: ", lobbies[code]);
            if (!lobbies[code]) {
                lobbies[code] = ["", socket.id];
                callback(Player.P1);
            }
            else {
                var session = lobbies[code];
                if (!session[Player.P1] || session[Player.P1] === "") {
                    session[Player.P1] = socket.id;
                    callback(Player.P1);
                }
                else if (!session[Player.P2 || session[Player.P2] === ""]) {
                    session[Player.P2] = socket.id;
                    callback(Player.P2);
                }
                else if (!session[Player.HACKER] ||
                    session[Player.HACKER] === "") {
                    session[Player.HACKER] = socket.id;
                    callback(Player.HACKER);
                }
                else {
                    callback(Player.NONE);
                    return;
                }
            }
            socket.join(code);
            console.log("Session after joining: ", lobbies[code]);
        });
        socket.on("newMessage", function (incomingMessage, code) {
            if (!lobbies[code])
                return;
            if (lobbies[code][3] === socket.id) {
                io.to(socket.id).emit("forwardMessage", incomingMessage);
                io.to(lobbies[code][incomingMessage.senderNumber === 1 ? 2 : 1]).emit("forwardMessage", incomingMessage);
            }
            else {
                io.to(code).emit("forwardMessage", incomingMessage);
            }
        });
    });
};
exports.startSocketServer = startSocketServer;
