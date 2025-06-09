import { io } from "socket.io-client";

// backend URL
const socket = io("http://localhost:5000", {
  transports: ["websocket"],
});

export default socket;
