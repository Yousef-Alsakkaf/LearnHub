import io from "socket.io-client";

const isProduction = process.env.NODE_ENV === "production";
const serverURL = isProduction ? "https://shelfmate-mcfs.onrender.com" : "http://localhost:4000";
const socket = io(serverURL);

// socket.on("connect", () => {
//   console.log("Connected to server!");
//   socket.connected = true;
// });

// socket.on("disconnect", () => {
//   window.location.href = "/";
//   window.location.reload();
// });

export default socket;