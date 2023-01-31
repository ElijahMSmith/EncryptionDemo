import React, { useState } from "react";
import { io, Socket } from "socket.io-client";
import "./Lobby.css";

export function Lobby({
	setConnection,
}: {
	setConnection: (arg0: Socket | null) => void;
}) {
	const [code, setCode] = useState("");

	function startGame() {
		const socket = io();
		// TODO: send event to connect to the provided code

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
