import { Server } from 'socket.io';

export function chatSocketInit(server) {
  const io = new Server(server);

  io.on('connection', (socket) => {
    const { id } = socket;
    const { idAuthor } = socket.handshake.query;
    socket.join(idAuthor);

    socket.on('getHistory', (args) => {
      const chatHistory = null;
      socket.emit('chat-history', chatHistory);
    })

    socket.on('sendMessage', (args) => {
      const message = null;
      socket.emit('new-message', message);
    })
  })
}