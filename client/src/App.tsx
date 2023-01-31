import React, { useState } from "react";
import { Lobby } from "./pages/Lobby";
import { Window } from "./pages/Window";
import { Socket } from "socket.io-client";

function App() {
	const [connection, setConnection] = useState<null | Socket>(null);

	return !connection ? (
		<Lobby setConnection={setConnection} />
	) : (
		<Window setConnection={setConnection} connection={connection} />
	);
}

export default App;
