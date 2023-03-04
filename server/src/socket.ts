import { Server } from "socket.io";
import { ServerHTTP } from ".";

enum Player {
	P1 = 1,
	P2 = 2,
	HACKER = 3,
	NONE = -1,
}

type Message = {
	senderNumber: Player;
	text: string;
};

type RunningLobbies = {
	[key: string]: string[];
};

const lobbies: RunningLobbies = {};

const startSocketServer = (server: ServerHTTP) => {
	const io = new Server(server, {
		cors: {
			origin: "http://localhost:3000",
			methods: ["GET", "POST"],
		},
	});

	io.on("connection", (socket) => {
		console.log("Connected socket " + socket.id);
		socket.on("disconnecting", () => {
			// Terminate games and disconnect all players if
			// disconnecting socket was participating
			console.log("Disconnecting socket " + socket.id);
			socket.rooms.forEach((room) => {
				socket.leave(room);
				const session = lobbies[room];
				if (session) {
					const index = session.indexOf(socket.id);
					if (index !== -1) session.splice(index, 1, "");
					console.log("Session after disconnecting", lobbies[room]);
				}
			});
		});

		socket.on("join", (code, callback) => {
			console.log("join (code: " + code + ")");
			console.log("callback:", callback);
			console.log("Session before joining: ", lobbies[code]);

			if (!lobbies[code]) {
				lobbies[code] = ["", socket.id];
				callback(Player.P1);
			} else {
				const session = lobbies[code];

				if (!session[Player.P1] || session[Player.P1] === "") {
					session[Player.P1] = socket.id;
					callback(Player.P1);
				} else if (!session[Player.P2 || session[Player.P2] === ""]) {
					session[Player.P2] = socket.id;
					callback(Player.P2);
				} else if (
					!session[Player.HACKER] ||
					session[Player.HACKER] === ""
				) {
					session[Player.HACKER] = socket.id;
					callback(Player.HACKER);
				} else {
					callback(Player.NONE);
					return;
				}
			}

			socket.join(code);
			console.log("Session after joining: ", lobbies[code]);
		});

		socket.on("newMessage", (incomingMessage: Message, code: string) => {
			if (!lobbies[code]) return;

			if (lobbies[code][3] === socket.id) {
				io.to(socket.id).emit("forwardMessage", incomingMessage);
				io.to(
					lobbies[code][incomingMessage.senderNumber === 1 ? 2 : 1]
				).emit("forwardMessage", incomingMessage);
			} else {
				io.to(code).emit("forwardMessage", incomingMessage);
			}
		});
	});
};

export { startSocketServer };
