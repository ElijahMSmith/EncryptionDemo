import { PlayerNames, WindowRendererProps } from "../../types";
import "./NormalWindow.css";
import SendIcon from "@mui/icons-material/Send";

export function NormalWindow({
	activeMessage,
	setActiveMessage,
	sendMessage,
	messageHistory,
	playerNumber = 1,
}: WindowRendererProps) {
	return (
		<form onSubmit={sendMessage}>
			<div id="normalWindowPage">
				<div id="normalContainer">
					<h1 id="normalReceiverName">
						{playerNumber === 1 ? PlayerNames[2] : PlayerNames[1]}
					</h1>
					<div id="normalMessageHistory">
						{messageHistory.map((message) => {
							return (
								<div
									className={`normalMessageBubble ${
										message.fromMe
											? "normalMyBubble"
											: "normalNotMyBubble"
									}`}
									key={message.id}
								>
									<span className="normalSenderName">
										{message.fromMe ? "You\n" : ""}
									</span>
									<span className="normalSendTime">
										{message.time}
									</span>
									<span className="normalMessageContext">
										{message.text}
									</span>
								</div>
							);
						})}
					</div>
                    <div id="normalBottomBarWrapper">
                        
					<div id="normalBottomBar">
						<input
							id="normalMessageInput"
							type="text"
							value={activeMessage}
							onChange={(e) => setActiveMessage(e.target.value)}
						/>
						<button id="normalSendMessage" type="submit">
							<SendIcon />
						</button>
					</div>
                    </div>
				</div>
			</div>
		</form>
	);
}
