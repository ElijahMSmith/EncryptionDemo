import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import "./Window.css";

type Message = {
	time: string;
	text: string;
	id: number;
	fromMe: boolean;
};

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
}: {
	connection: Socket;
	setConnection: (arg0: Socket | null) => void;
}) {
	const [activeMessage, setActiveMessage] = useState("");
	const [messageHistory, setMessageHistory] = useState<Message[]>([]);

	useEffect(() => {
		connection.on("disconnect", () => {});
		connection.on("receiveMessage", () => {});

		return () => {
			connection.off("disconnect");
			connection.off("receiveMessage");
		};
	}, []);

	useEffect(() => {
		setMessageHistory([
			{
				text: "Testing",
				time: new Date().toLocaleString(),
				id: generator.next(),
				fromMe: true,
			},
			{
				text: "Also testing",
				time: new Date().toLocaleString(),
				id: generator.next(),
				fromMe: false,
			},
		]);
	}, []);

	function sendMessage() {
		if (activeMessage === "") return;
		connection.emit(activeMessage);
		setActiveMessage("");
	}

	return (
		<div id="page">
			<div id="container">
				<div id="messageHistory">
					{messageHistory.map((message) => {
						return (
							<div
								className={`messageBubble ${
									message.fromMe ? "myBubble" : "notMyBubble"
								}`}
								key={message.id}
							>
								<span className="sendTime">{message.time}</span>
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
					<input
						id="sendMessage"
						type="button"
						value="Send!"
						onClick={() => sendMessage()}
					/>
				</div>
			</div>
		</div>
	);
}
