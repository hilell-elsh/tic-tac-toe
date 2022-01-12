const {
    getPlayer,
    removePlayer
} = require('./players')
const useWaitingRoom = require('./compositions/waitingRoom')

module.exports = function createSocketIo(httpServer) {
    const io = require('socket.io')(httpServer);
    io.on('connection', (socket) => {
        socket.on('identify', (userId) => {
            const player = getPlayer(userId);
            if (player.status === 'wait') {
                useWaitingRoom(socket, player)
            } else if (player.status === 'in-play') {

            }
        })
    });
}