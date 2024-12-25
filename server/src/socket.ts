import { Server } from 'socket.io';
import config from 'config';
import logger from './utils/logger.utils';

const clientUrl = config.get<string>('clientUrl');
const adminUrl = config.get<string>('adminUrl');

const io = new Server();


interface IUser {
  userId: string;
  userRole: string;
  socketId: string;
}

let users: IUser[] = [];

const addUser = (
  userId: string,
  socketId: string,
  userRole: string,
) => {
  !users.some((user) => user.userId === userId) &&
    users.push({
      userId,
      socketId,
      userRole,
    });
};

const removeUser = (socketId: string) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (type: string) => {
  if (type === 'admin') {
    return users.find((user) => user.userRole === type);
  } else {
    return users.find((user) => user.userId === type);
  }
};

io.on('connection', (socket) => {
  logger.info('Client connected');

  // Handle the addUser event here
  socket.on('sendUser', ({ userId, userRole }) => {
    addUser(userId, socket.id, userRole);

    // Sending users
    io.emit('getUsers', users);
  });

  // Handle Send Message
  socket.on('sendMessage', (message) => {
    const user = getUser('admin');

    if (user) {
      io.to(user.socketId).emit('getMessage', message);
    }
  });

  socket.on('sendMessageToUser', (message) => {
    const user = getUser(message.chatId);

    if (user) {
      io.to(user.socketId).emit('getMessage', message);
    }
  });

  // Delete Message
  socket.on('deleteMessage', (userId) => {
    const user = getUser(userId);

    if (user) {
      io.to(user.socketId).emit('deleteMessage', userId);
    }
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    logger.error('Client disconnected');

    // Remove user
    removeUser(socket.id);

    // Sending users
    io.emit('getUsers', users);
  });
});

export default io;
