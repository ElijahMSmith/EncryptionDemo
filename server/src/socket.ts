import { Server } from "socket.io";
import { ServerHTTP } from ".";

enum Player {
	P1 = 1,
	P2 = 2,
	HACKER = 3,
	NONE = -1,
}

type Message = {
	from: Player;
	time: string;
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
			socket.rooms.forEach((room) => socket.leave(room));
		});

		socket.on("join", (code, callback) => {
			console.log("join (code: " + code + ")");

			if (!lobbies[code]) {
				lobbies[code] = ["", socket.id];
				callback(Player.P1);
			} else {
				const session = lobbies[code];

				if (!session[Player.P2]) {
					session[Player.P2] = socket.id;
					callback(Player.P2);
				} else if (!session[Player.HACKER]) {
					session[Player.HACKER] = socket.id;
					callback(Player.HACKER);
				} else {
					callback(Player.NONE);
					return;
				}
			}

			socket.join(code);
		});

		socket.on("newMessage", (message: Message, code: string) => {
			io.to(code).emit("forwardMessage", message, socket.id);
		});
	});
};

export { startSocketServer };
