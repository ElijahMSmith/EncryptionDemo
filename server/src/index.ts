import Express from "express";
import http from "http";
import { startSocketServer } from "./socket";
import cors from "cors";

export type ServerHTTP = http.Server<
	typeof http.IncomingMessage,
	typeof http.ServerResponse
>;

const app = Express();
const server: ServerHTTP = http.createServer(app);
const port = 8080;

app.use(
	cors({
		origin: "http://localhost:3000",
	})
);

app.use("/", Express.static("build"));

server.listen(port, () => console.log(`Listening on port ${port}`));

startSocketServer(server);
