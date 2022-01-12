const {
    getPlayer,
    removePlayer
} = require('./players')
const useWaitingRoom = require('./compositions/waitingRoom')
const useGameRoom = require('./compositions/gameRoom')

const { setPlayerSocket, removePlayerSocket } = require('./players-sockets')

module.exports = function createSocketIo(httpServer) {
    const io = require('socket.io')(httpServer);
    io.on('connection', (socket) => {
        socket.on('identify', (userId) => {
            const player = getPlayer(userId);
            setPlayerSocket(player.id, socket);

            if (player.status === 'wait') {
                useWaitingRoom(socket, player)
            } else if (player.status === 'in-play') {
                
            }

            socket.on('disconnect', () => {
                removePlayerSocket(player.id)
            })
        })
    });
}