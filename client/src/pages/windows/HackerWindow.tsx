import { PlayerNames, WindowRendererProps } from "../../types";
import "./HackerWindow.css";
import SendIcon from "@mui/icons-material/Send";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { PlayerNumber } from "../../types";

const UP = -1;
const DOWN = 1;

type Digit = {
	element: HTMLParagraphElement;
	direction: -1 | 1;
	speed: number;
};

export function HackerWindow({
	activeMessage,
	setActiveMessage,
	sendMessage,
	messageHistory,
}: WindowRendererProps) {
	const [sendingAs, setSendingAs] = useState<PlayerNumber>(1);

	const [digits, setDigits] = useState<Digit[]>([]);

	useEffect(() => {
		const creationInterval = setInterval(() => {
			const container = document.querySelector("#outerContainer");
			if (!container) return;

			const pageHeight = window.innerHeight;
			const pageWidth = window.innerWidth;
			console.log(pageHeight, pageWidth);
			let count = pageWidth < 1500 ? 6 : 10;

			// console.log(digits.length);
			if (digits.length >= pageWidth / 20) {
				// console.log("Skipping");
				return;
			}

			const newDigits: Digit[] = [];
			while (count > 0) {
				count--;
				const newDigit = document.createElement("p");
				const direction = Math.random() < 0.5 ? DOWN : UP;
				newDigit.textContent = "" + (Math.random() < 0.5 ? 0 : 1);
				newDigit.classList.add("digit");

				newDigits.push({
					element: newDigit,
					direction,
					speed: Math.ceil(Math.random() * 3),
				});
				container.appendChild(newDigit);

				const elementWidth = newDigit.offsetWidth;
				const elementHeight = newDigit.offsetHeight;

				const top =
					direction === DOWN ? -2 * elementHeight : pageHeight;
				const left =
					Math.floor(Math.random() * pageWidth + 2 * elementWidth) -
					elementWidth;

				newDigit.style.top = top + "px";
				newDigit.style.left = left + "px";
			}

			setDigits([...digits, ...newDigits]);
		}, 350);

		const movementInterval = setInterval(() => {
			const pageHeight = window.innerHeight;
			for (let i = 0; i < digits.length; i++) {
				let digit = digits[i];
				const { element, direction, speed } = digit;

				const styles = window.getComputedStyle(element);
				const topStr = styles.getPropertyValue("top");
				const prevTop = parseInt(
					topStr.substring(0, topStr.length - 2)
				);
				const newTop = prevTop + direction * speed;
				element.style.top = `${newTop}px`;

				if (
					(direction === DOWN && newTop > pageHeight) ||
					(direction === UP && newTop < element.offsetHeight * -2)
				) {
					element.remove();
					digits.splice(i, 1);
					i--;
				}
			}
		}, 35);

		const swapInterval = setInterval(() => {
			for (let digit of digits) {
				if (Math.random() < 0.9) continue;
				digit.element.textContent =
					digit.element.textContent === "0" ? "1" : "0";
			}
		}, 300);

		return () => {
			clearInterval(creationInterval);
			clearInterval(movementInterval);
			clearInterval(swapInterval);
		};
	}, [digits]);

	return (
		<form
			onSubmit={(event: FormEvent<HTMLFormElement>) =>
				sendMessage(event, sendingAs)
			}
		>
			<div id="outerContainer">
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
									onChange={(
										e: ChangeEvent<HTMLSelectElement>
									) =>
										setSendingAs(
											Number(
												e.target.value
											) as PlayerNumber
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
			</div>
		</form>
	);
}
