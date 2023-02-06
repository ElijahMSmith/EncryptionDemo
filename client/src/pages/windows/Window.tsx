import React, { FormEvent, useEffect, useState } from "react";
import {
	ClientMessage,
	Enumerator,
	ServerMessage,
	WindowProps,
	WindowType,
} from "../../types";
import { HackerWindow } from "./HackerWindow";
import { NormalWindow } from "./NormalWindow";

const generator = new Enumerator();

export function Window({
	connection,
	setConnection,
	code,
	setCode,
	playerNum,
}: WindowProps) {
	const [activeMessage, setActiveMessage] = useState("");
	const [messageHistory, setMessageHistory] = useState<ClientMessage[]>([]);

	useEffect(() => {
		connection.on("disconnect", () => {
			setConnection(null);
			setCode("");
		});

		connection.on(
			"forwardMessage",
			(message: ServerMessage, senderId: string) => {
				setMessageHistory((oldHistory) => {
					return [
						...oldHistory,
						{
							...message,
							fromMe: senderId === connection.id,
							id: generator.next(),
						},
					];
				});
			}
		);

		return () => {
			connection.off("disconnect");
			connection.off("forwardMessage");
		};
	}, []);

	function sendMessage(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (activeMessage === "") return;
		connection.emit("newMessage", activeMessage, code);
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
