import { WindowRendererProps } from "../../types";
import "./HackerWindow.css";

export function HackerWindow({
	activeMessage,
	setActiveMessage,
	sendMessage,
	messageHistory,
}: WindowRendererProps) {
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
