"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const logger_utils_1 = __importDefault(require("./utils/logger.utils"));
// const clientUrl = config.get<string>('clientUrl');
// const adminUrl = config.get<string>('adminUrl');
// const io = new Server({
//   cors: {
//     origin: ["https://www.reinholders.com/", "https://identity.reinholders.com/", "https://reinadmin.vercel.app/", "https://cryptechy.vercel.app/", "https://uniqueserver-rzfq.onrender.com/"],
//   },
// });
const io = new socket_io_1.Server({
    cors: {
        origin: [
            "https://www.reinholders.com/",
            "https://identity.reinholders.com/",
            "https://reinadmin.vercel.app/",
            "https://cryptechy.vercel.app/",
            "https://uniqueserver-rzfq.onrender.com/"
        ],
        methods: ["GET", "POST", 'DELETE', 'OPTIONS'],
        allowedHeaders: ["Content-Type"],
    },
});
let users = [];
const addUser = (userId, socketId, userRole) => {
    !users.some((user) => user.userId === userId) &&
        users.push({
            userId,
            socketId,
            userRole,
        });
};
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};
const getUser = (type) => {
    if (type === 'admin') {
        return users.find((user) => user.userRole === type);
    }
    else {
        return users.find((user) => user.userId === type);
    }
};
io.on('connection', (socket) => {
    logger_utils_1.default.info('Client connected');
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
        logger_utils_1.default.error('Client disconnected');
        // Remove user
        removeUser(socket.id);
        // Sending users
        io.emit('getUsers', users);
    });
});
exports.default = io;
