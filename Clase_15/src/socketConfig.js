import { Server } from "socket.io";
import { __dirname } from "./utils.js";
//import MessageManager from "./dao/mongodb/chat.dao.js";
import MessageManager from "./dao/filesystem/chat.dao.js"

const messageManager = new MessageManager(`${__dirname}/data/messages.json`);

export const configureSocket = (httpServer) => {
    const socketServer = new Server(httpServer);

    socketServer.on('connection', async (socket) => {
        console.log(`🟢 Cliente conectado: ${socket.id}`);
        socketServer.emit('mesasges', await messageManager.getAll()); //emite a todos los clientes
    
        socket.on('disconnect', () => {
            console.log(`🔴 User disconnected`, socket.id);
        });
    
        socket.on('newUser', (user) => {
            console.log(`> ${user} ha iniciado sesión`);
            socket.broadcast.emit('newUser', user)
        });
    
        socket.on('chatMessage', async (msg) => {
            await messageManager.createMsg(msg);
            socketServer.emit('messages', await messageManager.getAll()); //emite a todos los clientes
        });

        socket.on('startTyping', (user) => {
            socket.broadcast.emit('startTyping', user);
        });

        socket.on('stopTyping', (user) => {
            socket.broadcast.emit('stopTyping')
        })
    })
}
