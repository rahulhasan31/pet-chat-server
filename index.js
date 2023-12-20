const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io'); // Add this
const port=process.env.PORT||3001
app.use(cors()); // Add cors middleware

const server = http.createServer(app); // Add this

// Add this
// Create an io server and allow for CORS from http://localhost:3000 with GET and POST methods
const io = new Server(server, {
  cors: {
    origin: 'https://pet-food-client.netlify.app',
    methods: ['GET', 'POST'],
  },
});

// Add this
// Listen for when the client connects via socket.io-client
io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("send-message", (message)=>{
    console.log(message);

    io.emit("received-message", message)
  })

  // We can write our socket event listeners in here...
  socket.on("disconnect" , ()=>{
    console.log('user disconnect');
  })
});

server.listen(port, () => {
    console.log('Server is running on port 3001');
});