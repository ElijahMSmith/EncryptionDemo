import React, { FormEvent } from "react";
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
	function startGame(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const socket = io("http://localhost:8080");
		socket.emit("join", code);
		setConnection(socket);
	}

	return (
		<form onSubmit={(e: FormEvent<HTMLFormElement>) => startGame(e)}>
			<div id="lobbyPage">
				<div id="lobbyContainer">
					<h1 id="lobbyHeader">Enter Chat Code</h1>
					<input
						id="codeInput"
						type="text"
						value={code}
						onChange={(event) => setCode(event.target.value)}
					/>
					<button id="codeSubmit" type="submit">
						Go!
					</button>
				</div>
			</div>
		</form>
	);
}
