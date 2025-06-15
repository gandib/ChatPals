import { io } from "socket.io-client";

// backend URL
const socket = io(`${import.meta.env.VITE_BASE_API}`, {
  transports: ["websocket"],
  // transports: ["polling"],
  // upgrade: false,
  // reconnection: true,
  // forceNew: true,
});

export default socket;
