import { Server } from "socket.io";
//import { __dirname } from "./utils.js";
import MessageManager from "./dao/mongodb/chat.dao.js";
//import * as messageManager from "./services/chat.services.js";
//import MessageManager from "./dao/filesystem/chat.dao.js"

//const messageManager = new MessageManager(`${__dirname}/data/messages.json`);

export const configureSocket = (httpServer) => {
    const socketServer = new Server(httpServer);

    socketServer.on('connection', async (socket) => {
        console.log(`🟢 Usuerio conectado: ${socket.id}`);
        socketServer.emit('messages', await MessageManager.getAll()); //emite a todos los clientes
    
        socket.on('disconnect', () => {
            console.log(`🔴 Usuario desconectado`, socket.id);
        });
    
        socket.on('newUser', (user) => {
            console.log(`> ${user} ha iniciado sesión`);
            socket.broadcast.emit('newUser', user)
        });
    
        socket.on('chatMessage', async (msg) => {
            await MessageManager.createMsg(msg);
            socketServer.emit('messages', await MessageManager.getAll()); //emite a todos los clientes
        });

        socket.on('startTyping', (user) => {
            socket.broadcast.emit('startTyping', user);
        });

        socket.on('stopTyping', (user) => {
            socket.broadcast.emit('stopTyping')
        })
    })
}
