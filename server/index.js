const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);
const connectedUsers = new Set();

const io = new Server(server, {
  cors: {
    origin: "http://192.168.1.158:3000",
    methods: ["GET", "POST", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  connectedUsers.add(socket.id);

  socket.on("add_note", (data) => {
    socket.broadcast.emit("receive_note", data);

  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
    // Remove the user's socket ID from the connectedUsers set
    connectedUsers.delete(socket.id);
  });

});

server.listen(3001, () => {
  console.log("Server is up!");
});
