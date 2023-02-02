import { Server } from "socket.io";
import { ServerHTTP } from ".";

type Message = {
	time: string;
	text: string;
	id: number;
};

const startSocketServer = (server: ServerHTTP) => {
	const io = new Server(server);

	io.on("connection", (socket) => {
		console.log("Connected socket " + socket.id);
		socket.on("disconnecting", () => {
			// Terminate games and disconnect all players if
			// disconnecting socket was participating
			console.log("Disconnecting socket " + socket.id);
			socket.rooms.forEach((room) => socket.leave(room));
		});

		socket.on("join", (code) => {
			socket.join(code);
		});

		socket.on("newMessage", (message, code) => {
			io.to(code).emit("forwardMessage", message, socket.id);
		});
	});
};

export { startSocketServer };
