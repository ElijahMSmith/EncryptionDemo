import { PlayerNames, WindowRendererProps } from "../../types";
import "./HackerWindow.css";
import SendIcon from "@mui/icons-material/Send";
import { ChangeEvent, FormEvent, useState } from "react";
import { PlayerNumber } from "../../types";

export function HackerWindow({
	activeMessage,
	setActiveMessage,
	sendMessage,
	messageHistory,
}: WindowRendererProps) {
	const [sendingAs, setSendingAs] = useState<PlayerNumber>(1);

	return (
		<form
			onSubmit={(event: FormEvent<HTMLFormElement>) =>
				sendMessage(event, sendingAs)
			}
		>
			<div id="hackerWindowPage">
				<div id="hackerContainer">
					<div id="hackerMessageHistory">
						{messageHistory.map((message) => {
							return (
								<div
									className={`hackerMessageBubble ${
										message.senderNumber === 1
											? "hackerBubbleLeft"
											: "hackerBubbleRight"
									}`}
									key={message.id}
								>
									<span className="hackerSenderName">
										{PlayerNames[message.senderNumber]}
									</span>
									<span className="hackerSendTime">
										{message.time}
									</span>
									<span className="hackerMessageContext">
										{message.text}
									</span>
								</div>
							);
						})}
					</div>

					<div id="divider" />

					<div id="sendingBarWrapper">
						<div id="sendingBar">
							<h1 id="sendingAsLabel">Send As:</h1>
							<select
								value={sendingAs}
								onChange={(e: ChangeEvent<HTMLSelectElement>) =>
									setSendingAs(
										Number(e.target.value) as PlayerNumber
									)
								}
								id="hackerSendAsSelect"
							>
								<option value={1} id="playerOneOption">
									Octavius (P1)
								</option>
								<option value={2} id="playerTwoOption">
									Giggles (P2)
								</option>
							</select>
						</div>
					</div>

					<div id="hackerBottomBarWrapper">
						<div id="hackerBottomBar">
							<input
								id="hackerMessageInput"
								type="text"
								autoComplete="off"
								value={activeMessage}
								onChange={(e) =>
									setActiveMessage(e.target.value)
								}
							/>
							<button id="hackerSendMessage" type="submit">
								<SendIcon />
							</button>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
}
