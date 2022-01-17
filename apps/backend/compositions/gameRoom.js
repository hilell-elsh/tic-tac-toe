const { getGame, resetGame } = require('../games')
const { getPlayerSocket, emitToPlayer } = require('../players-sockets')


function useGameRoom(player) {
    const game = getGame(player.gameId)
    const socket = getPlayerSocket(player.id)

    function sendStatus() {
        socket.emit('status', game)
    }

    socket.on('request-status', sendStatus)
    socket.on('move', ({i, j}) => {
        if (game.status !== 'running') {return}
        if (game.players[game.turn] !== player.id) {
            return
        }

        if (game.board[i][j] !== null) {
            return
        }

        game.board[i][j] = game.turn

        const {status, winner} = getGameStatus(game)
        game.status = status
        game.winner = game.players[winner] || null

        if (status === 'running') {
            game.turn = game.turn === "x" ? "o" : "x"
        }


    })
    socket.on('restart', () => {
        if (game.restarted.includes(player.id) ) {
            return
        }
        game.restarted.push(player.id);
        if (game.restarted.length === 2) {
            resetGame(game.id);
            emitToPlayer(game.players.x, 'status', game);
            emitToPlayer(game.players.o, 'status', game);
        }
    })
}

function getGameStatus({board, turn}) {
    const status = {
        status: "running",
        winner: null
    }

    const winningString = turn+turn+turn

    for (let i = 0; i < board.length; i++) {
        // for (let j = 0; j < board.length; j++) {
        // }
        const row = board[i];
        const column = board.map((row) => row[i]);
        if (row.join('') === winningString || column.join('') === winningString) {
            status.status = 'ended';
            status.winner = turn;
            break;
        }
    }

    if (!status.winner) {
        const diagonalA = board.map((_, i) => board[i][i]);
        const diagonalB = board.map((_, i) => board[i][board.length - i - 1]);

        if (diagonalA.join('') === winningString || diagonalB.join('') === winningString) {
            status.status = 'ended';
            status.winner = turn
        }
    }

    if (!status.winner) {
        if (board.some(row => !row.includes(null))) {
            status.status = 'ended';
        }

    }

    return status
}

module.exports = useGameRoom