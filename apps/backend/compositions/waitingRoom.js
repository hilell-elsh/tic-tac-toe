const {joinToGame} = require('../players')
const {createGame} = require('../games')
const { disconnectPlayer, emitToPlayer } = require('../players-sockets')

let randomWaitingPlayer = null
const gameCodes = {};



const useWaitingRoom = (player) => {

    emitToPlayer(player.id, 'status', {status: 'wait'})

    switch (player.connectionOption) {
        case 'random':
            if (randomWaitingPlayer && randomWaitingPlayer !== player.id) {
                const game = createGame(player.id, randomWaitingPlayer)

                joinToGame(player.id, game.id)
                joinToGame(randomWaitingPlayer, game.id)
                disconnectPlayer(player.id)
                disconnectPlayer(randomWaitingPlayer)
            } else {
                randomWaitingPlayer = player.id;
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