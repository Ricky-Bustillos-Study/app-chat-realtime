import express from 'express';
import socketio from 'socket.io';
import http from 'http';
import path from 'path';

import { formatMessage } from './utils/messages';

const app = express();
const httpServer = http.createServer(app);
const io = new socketio.Server(httpServer);

// Set static html folder
app.use(express.static(path.join(__dirname, '..', 'public')));

const bot = {
  name: 'Space Bot',
}
const messages: Array<{ username: string, message: string, time: string }> = [];

io.on('connection', socket => {


  // Runs when client disconnects
  socket.on('disconnect', () => {
    let serverMessage = formatMessage(bot.name, 'A user has left');
    messages.push(serverMessage);
    io.emit('serverMessage', serverMessage);
    console.log(`Disconnected: ${socket.id}`);
  });

  // Listen for chat message
  socket.on('chatMessage', data => {
    data = formatMessage(data.username, data.message);
    messages.push(data);
    io.emit('receivedMessage', data);
  });
});


// Set PORT
const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`HTTP Server running on port ${PORT}`);
});