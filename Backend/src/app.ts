import express from "express";
import { Server as HttpServer } from "http";
import chatService from "./services/chat-service";

// Create express server:
const expressServer = express();

// Listen:
const httpServer: HttpServer = expressServer.listen(4000, () => console.log("Listening on http://localhost:4000"));

// Init chat:
chatService.initChat(httpServer);