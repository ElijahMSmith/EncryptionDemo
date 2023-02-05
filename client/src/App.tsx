import React, { useState } from "react";
import { Socket } from "socket.io-client";
import { Lobby } from "./pages/lobby/Lobby";
import { Window } from "./pages/windows/Window";
import { WindowType } from "./types";

function App() {
	const [connection, setConnection] = useState<null | Socket>(null);
	const [code, setCode] = useState<string>("");

	return !connection ? (
		<Lobby setConnection={setConnection} setCode={setCode} code={code} />
	) : (
		<Window
			setConnection={setConnection}
			connection={connection}
			setCode={setCode}
			code={code}
			type={WindowType.NORMAL}
		/>
	);
}

export default App;
