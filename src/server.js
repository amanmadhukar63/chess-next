// server.js
import { createServer } from 'http';
import next from 'next';
import { Server } from 'socket.io';

const app = next({ dev: true });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

let room = {};

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  const io = new Server(server, {
    path: "/api/socketio", // important to keep clean
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("joinRoom", (roomId) => {
      // if (!rooms.has(roomId)) {
      //   socket.emit("error", "Room does not exist");
      //   return;
      // }
      if(room?.id){
        if(room?.id === roomId){ 
          socket.join(roomId);
          io.in(roomId).emit("player_joined", {
            message: "Player 2 joined",
            player1: room.player1,
            player2: room.player2,
            waiting: false
          });
          room={};
        }
        else socket.emit("error", "Invalid Room Id, Room does not exist");
      }
      else{
        const player1 = Math.round(Math.random()) ? 'black' : 'white';
        const player2 = player1 === 'white' ? 'black' : 'white';
        room = {
          id: roomId,
          player1,
          player2
        }
        socket.join(roomId);
        socket.emit("player_joined", {
          message: "Player 1 joined",
          player1: room.player1,
          player2: room.player2,
          waiting: true
        });
      }
      console.log(`${socket.id} joined room ${roomId}`);
    });

    socket.on("move", ({ roomId, move }) => {
      console.log('move recieved.........',move);
      socket.to(roomId).emit("opponentMove", move);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  // make io and rooms globally available
  // global.io = io;
  // global.rooms = rooms;

  server.listen(port, () => {
    console.log("✅ Server + WebSocket running on http://localhost:3000");
  });
});
