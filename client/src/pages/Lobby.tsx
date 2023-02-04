import React from "react";
import { io, Socket } from "socket.io-client";
import "./Lobby.css";

export function Lobby({
	code,
	setCode,
	setConnection,
}: {
	code: string;
	setCode: (arg0: string) => void;
	setConnection: (arg0: Socket | null) => void;
}) {
	function startGame() {
		const socket = io("http://localhost:8080");
		socket.emit("join", code);
		setConnection(socket);
	}

	return (
		<div id="page">
			<div id="container">
				<h1>Enter Chat Code</h1>
				<input
					id="codeInput"
					type="text"
					value={code}
					onChange={(event) => setCode(event.target.value)}
				/>
				<input
					id="submit"
					type="button"
					onClick={startGame}
					value="Go!"
				/>
			</div>
		</div>
	);
}
