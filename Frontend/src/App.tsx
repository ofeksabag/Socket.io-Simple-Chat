import './App.css';
import { Socket, io } from "socket.io-client";
import { ChangeEvent, useRef, useState } from 'react';

let socket: Socket;

function App() {

    const [message, setMessage] = useState<string>();
    const [allMessages, setAllMessages] = useState<string[]>([]);

    const inputMessage = useRef<HTMLInputElement>(null);

    // Connect to socket.io server:
    function connect(): void {

        // 2. Connect to socket.io server:
        socket = io("http://localhost:4000");

        // 5. Listen to server messages:
        socket.on("msg-from-server", (msg: string) => {
            setAllMessages(prev => [...prev, msg]);
        });

    }

    function handleChange(args: ChangeEvent<HTMLInputElement>): void {
        setMessage(args.target.value);
    }

    function sendMessage(): void {

        // 4. Client send message to server:
        socket.emit("msg-from-client", message);

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
            {allMessages.map((m, index) => <div key={index} className="one-message">{m}</div>)}
        </div>

        <input type="text" ref={inputMessage} onChange={handleChange} value={message} placeholder="Type here message..." />
        <button onClick={sendMessage}>Send</button>

    </div>
  );
}

export default App;