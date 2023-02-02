import Express from "express";
import http from "http";
import { startSocketServer } from "./socket";

export type ServerHTTP = http.Server<
	typeof http.IncomingMessage,
	typeof http.ServerResponse
>;

const app = Express();
const server: ServerHTTP = http.createServer(app);
const port = 3000;

app.use("/", Express.static("static"));

server.listen(port, () => console.log(`Listening on port ${port}`));

startSocketServer(server);
