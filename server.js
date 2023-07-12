const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Serve static files from the public directory
app.use(express.static('public'));

// Handle socket connections
io.on('connection', (socket) => {
  console.log('A user connected');

// Receive and broadcast chat messages
socket.on('chat message', (data) => {
  const { username, message } = data;
  io.emit('chat message', { username, message });
});


// Handle user login
socket.on('login', (username) => {
  console.log(`User ${username} logged in`);
  socket.username = username;
});
  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
