import './App.css';
import { Socket, io } from "socket.io-client";
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import MessageModel from './models/MessageModel';

let socket: Socket;

function App() {

    const [username, setUsername] = useState<string>();
    const [message, setMessage] = useState<string>();
    const [color, setColor] = useState<string>();

    const [allMessages, setAllMessages] = useState<{username: string, message: string, color: string}[]>([]);

    const inputMessage = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const colorsList = ["red","green","purple","blue"];
        const randNumber = Math.floor(Math.random() * colorsList.length);
        setColor(colorsList[randNumber]);
    }, []);

    // Connect to socket.io server:
    function connect(): void {

        // 2. Connect to socket.io server:
        socket = io("http://localhost:4000");

        // 5. Listen to server messages:
        socket.on("msg-from-server", (msg: MessageModel) => {
            setAllMessages(prev => [ ...prev, msg ]);
        });

    }

    function handleChange(args: ChangeEvent<HTMLInputElement>): void {
        setMessage(args.target.value);
    }

    function handleChangeUsername(args: ChangeEvent<HTMLInputElement>): void {
        setUsername(args.target.value);
    }

    function sendMessage(): void {

        const msg: MessageModel = {
            username: username as string,
            message: message as string,
            color: color as string
        }

        // 4. Client send message to server:
        socket.emit("msg-from-client", msg);

        setMessage('');

        if(inputMessage.current) inputMessage.current.focus();

    }

    function disconnect(): void {

        // 8. Disconnect from server:
        socket.disconnect();

    }

  return (
    <div className="App">

        <button onClick={connect}>Connect</button>
        <button onClick={disconnect}>Disconnect</button>

        <div className="MessagesDiv">
            {/* index = key from the map */}
            {allMessages.map((msg, index) => <div key={index} className="one-message" style={{color: msg.color}}>{msg.username}: {msg.message}</div>)}
        </div>

        <input type="text" onChange={handleChangeUsername} placeholder="Username" />
        <input type="text" ref={inputMessage} onChange={handleChange} value={message} placeholder="Type here message..." />
        <button onClick={sendMessage}>Send</button>

    </div>
  );
}

export default App;