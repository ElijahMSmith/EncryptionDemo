import React, { FormEvent } from "react";
import { io, Socket } from "socket.io-client";
import { PlayerNumber } from "../../types";
import "./Lobby.css";

export function Lobby({
	code,
	setCode,
	setConnection,
	setPlayerNum,
}: {
	code: string;
	setCode: (arg0: string) => void;
	setConnection: (arg0: Socket | null) => void;
	setPlayerNum: (arg0: PlayerNumber) => void;
}) {
	function startGame(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const socket = io("http://localhost:8080");
		socket.emit("join", code, (playerNum: PlayerNumber) =>
			setPlayerNum(playerNum)
		);
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
						autoComplete="off"
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
