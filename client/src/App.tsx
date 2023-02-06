import React, { useState } from "react";
import { Socket } from "socket.io-client";
import { Lobby } from "./pages/lobby/Lobby";
import { Window } from "./pages/windows/Window";
import { PlayerNumber, WindowType } from "./types";

function App() {
	const [connection, setConnection] = useState<null | Socket>(null);
	const [code, setCode] = useState<string>("");
	const [playerNum, setPlayerNum] = useState<PlayerNumber>(-1);

	return !connection || playerNum === -1 ? (
		<Lobby
			setConnection={setConnection}
			setCode={setCode}
			code={code}
			setPlayerNum={setPlayerNum}
		/>
	) : (
		<Window
			setConnection={setConnection}
			connection={connection}
			setCode={setCode}
			code={code}
			playerNum={playerNum}
		/>
	);
}

export default App;
