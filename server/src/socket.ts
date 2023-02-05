import { Server } from "socket.io";
import { ServerHTTP } from ".";

type Message = {
	time: string;
	text: string;
};

const lobbies = {};

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

		socket.on("join", (code) => {
			console.log("join (code: " + code + ")");

			if (!lobbies[code]) {
			}
		});

		socket.on("newMessage", (message, code) => {
			console.log(
				"newMessage (message: " + message + ", code: " + code + ")"
			);
			io.to(code).emit(
				"forwardMessage",
				{ time: new Date().toLocaleString(), text: message },
				socket.id
			);
		});
	});
};

export { startSocketServer };
