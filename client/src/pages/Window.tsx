import React, { FormEvent, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import "./Window.css";

type ServerMessage = {
	time: string;
	text: string;
};

type ClientMessage = ServerMessage & { fromMe: boolean; id: number };

class Enumerator {
	count: number;

	constructor() {
		this.count = 0;
	}

	next() {
		return this.count++;
	}
}

const generator = new Enumerator();

export function Window({
	connection,
	setConnection,
	code,
	setCode,
}: {
	connection: Socket;
	setConnection: (arg0: Socket | null) => void;
	code: string;
	setCode: (arg0: string) => void;
}) {
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

	return (
		<form onSubmit={sendMessage}>
			<div id="page">
				<div id="container">
					<div id="messageHistory">
						{messageHistory.map((message) => {
							return (
								<div
									className={`messageBubble ${
										message.fromMe
											? "myBubble"
											: "notMyBubble"
									}`}
									key={message.id}
								>
									<span className="senderName">
										{message.fromMe ? "You\n" : ""}
									</span>
									<span className="sendTime">
										{message.time}
									</span>
									<span className="messageContext">
										{message.text}
									</span>
								</div>
							);
						})}
					</div>
					<div id="bottomBar">
						<input
							id="messageInput"
							type="text"
							value={activeMessage}
							onChange={(e) => setActiveMessage(e.target.value)}
						/>
						<button id="sendMessage" type="submit">
							Send!
						</button>
					</div>
				</div>
			</div>
		</form>
	);
}
