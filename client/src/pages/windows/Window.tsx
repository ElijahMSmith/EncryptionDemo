import React, { FormEvent, useEffect, useState } from "react";
import {
	ClientMessage,
	Enumerator,
	PlayerNumber,
	ServerMessage,
	WindowProps,
} from "../../types";
import { HackerWindow } from "./HackerWindow";
import { NormalWindow } from "./NormalWindow";

const generator = new Enumerator();

export function Window({
	connection,
	code,
	setCode,
	playerNum,
	setConnection,
}: WindowProps) {
	const [activeMessage, setActiveMessage] = useState("");
	const [messageHistory, setMessageHistory] = useState<ClientMessage[]>([]);

	useEffect(() => {
		connection.on("disconnect", () => {
			setConnection(null);
			setCode("");
		});

		connection.on("forwardMessage", (message: ServerMessage) => {
			setMessageHistory((oldHistory) => {
				return [
					...oldHistory,
					{
						...message,
						time: new Date().toLocaleString(),
						id: generator.next(),
					},
				];
			});
		});

		return () => {
			connection.off("disconnect");
			connection.off("forwardMessage");
		};
	}, []);

	function sendMessage(
		event: FormEvent<HTMLFormElement>,
		playerNumOverride?: PlayerNumber
	) {
		event.preventDefault();
		if (activeMessage === "") return;
		const newMessage: ServerMessage = {
			senderNumber: playerNumOverride ?? playerNum,
			text: activeMessage,
		};
		connection.emit("newMessage", newMessage, code);
		setActiveMessage("");
	}

	return playerNum === 3 ? (
		<HackerWindow
			activeMessage={activeMessage}
			setActiveMessage={setActiveMessage}
			sendMessage={sendMessage}
			messageHistory={messageHistory}
		/>
	) : (
		<NormalWindow
			activeMessage={activeMessage}
			setActiveMessage={setActiveMessage}
			sendMessage={sendMessage}
			messageHistory={messageHistory}
			playerNumber={playerNum}
		/>
	);
}
