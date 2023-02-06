import { FormEvent } from "react";
import { Socket } from "socket.io-client";

export type ServerMessage = {
	time: string;
	text: string;
};

export type ClientMessage = ServerMessage & { fromMe: boolean; id: number };

export enum WindowType {
	HACKER,
	NORMAL,
}

export const PlayerNames = ["", "Octavius", "Giggles", "Hacker Man"];

export type PlayerNumber = -1 | 1 | 2 | 3;

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
	sendMessage: (event: FormEvent<HTMLFormElement>) => void;
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