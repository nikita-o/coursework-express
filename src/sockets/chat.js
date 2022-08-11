import { Server } from 'socket.io';
import chatModule from '../modules/chat.js';

export function chatSocketInit(server) {
  const io = new Server(server);

  io.on('connection', (socket) => {
    const { id } = socket;
    const { idAuthor } = socket.handshake.query;
    socket.join(idAuthor);

    socket.on('getHistory', async (idСompanion) => {
      const users = {
        idAuthor: idAuthor,
        idReceiver: idСompanion
      }
      const chat = await chatModule.find(users);
      const chatHistory = chat
      ? await chatModule.getHistory(connectChat._id)
      : {
          data: 'Несуществующий чат',
          status: 'error',
        };

      socket.emit('chat-history', chatHistory);
    })

    socket.on('sendMessage', async (data) => {
      data.idAuthor = idAuthor;
      const message = await chatModule.sendMessage(data);
      socket.emit('new-message', message);
    })

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${id}`);
    });
  })
}