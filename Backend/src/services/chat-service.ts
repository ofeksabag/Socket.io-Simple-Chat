import { Server as HttpServer } from "http";
import { Server as SocketIoServer, Socket } from "socket.io";
import messageModel from "../4-models/message-model";

function initChat(httpServer: HttpServer): void {

    // CORS:
    const options = { cors: { origin: "*" } };

    // Create socket-io server:
    const socketIoServer = new SocketIoServer(httpServer, options);

    // 1. Listen to client connections:
    socketIoServer.sockets.on("connection", (socket: Socket) => {

        console.log("One client has been connected...");

        // 3. Listen to client messages:
        socket.on("msg-from-client", (msg: messageModel) => {

            // 6. Send message to all clients:
            socketIoServer.sockets.emit("msg-from-server", msg);

        });

        // 7. Listen to disconnect:
        socket.on("disconnect", () => {
            console.log("One client has been disconnect...");
        });

    });

}

export default {
    initChat
}