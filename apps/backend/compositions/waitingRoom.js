let randomWaitingPlayer = null

const {joinToGame} = require('../players')
const {createGame} = require('../games')

const useWaitingRoom = (socket, player) => {

    switch (player.connectionOption) {
        case 'random':
            if (randomWaitingPlayer) {
                randomWaitingPlayer(player.id)
                socket.disconnect()
            } else {
                randomWaitingPlayer = (opponentId) => {

                    const game = createGame(player.id, opponentId)

                    joinToGame(player.id, game.id)
                    joinToGame(opponentId, game.id)
                    socket.disconnect()
                };
            }
            break;
        case 'join':
            socket.on('findGame', () => {
        
            })
            break;
        case 'create':
            break;
    }

}

module.exports = useWaitingRoom