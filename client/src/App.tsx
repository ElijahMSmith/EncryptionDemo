import React, { useState } from "react";
import { Lobby } from "./pages/Lobby";
import { Window } from "./pages/Window";
import { Socket } from "socket.io-client";

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
		/>
	);
}

export default App;
