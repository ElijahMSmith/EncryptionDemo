import { FormEvent } from "react";
import { Socket } from "socket.io-client";

export const PlayerNames = ["", "Octavius", "Giggles", "Hacker Man"];

export type PlayerNumber = -1 | 1 | 2 | 3;

export type ServerMessage = {
	text: string;
	senderNumber: PlayerNumber;
};

export type ClientMessage = ServerMessage & {
	time: string;
	id: number;
};

export enum WindowType {
	HACKER,
	NORMAL,
}

export type WindowProps = {
	connection: Socket;
	setConnection: (arg0: Socket | null) => void;
	code: string;
	setCode: (arg0: string) => void;
	playerNum: PlayerNumber;
};

export type WindowRendererProps = {
	activeMessage: string;
	setActiveMessage: (arg0: string) => void;
	sendMessage: (
		event: FormEvent<HTMLFormElement>,
		playerNumberOverride?: PlayerNumber
	) => void;
	messageHistory: ClientMessage[];
	playerNumber?: PlayerNumber;
};

export class Enumerator {
	count: number;

	constructor() {
		this.count = 0;
	}

	next() {
		return this.count++;
	}
}
