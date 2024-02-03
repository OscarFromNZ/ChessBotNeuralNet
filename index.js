const { Chess } = require('chess.js');
const readline = require('node:readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// Neural net stuff
let Network = require('./Network');
let babyNames = require('./names.json');

let numberOfInputs = 64;
let hiddenLayerNeurons = 100;
let outputLayerNeurons = 6;

let network = new Network(numberOfInputs, hiddenLayerNeurons, outputLayerNeurons, babyNames);

// each given input is an array of the board state as an integer, each int being a piece and the target output which is 
let inputs = [[[]]];

for (let input of inputs) {
    network.input(input);
}

const chess = new Chess();
let lastMove = 'Start';

function askMove() {
    readline.question(`Last move: ${lastMove}. Your move? `, move => {
        const result = chess.move(move);
        if (result === null) {
            console.log('Invalid move, try again.');
            askMove(); // Ask again if invalids
        } else {
            lastMove = move;
            gameLoop(); // continue
        }
    });
}

// I'd like for this to be get random move but that would mean I'd have to make askMove get move and it's like asynchronous or whatever you call it so I can't easily yk
function makeRandomMove() {
    const legalMoves = chess.moves();
    const move = legalMoves[Math.floor(Math.random() * legalMoves.length)];
    chess.move(move);
    lastMove = move;
    console.log(`Computer moved: ${move}`);
}

function gameLoop() {
    if (chess.isGameOver()) {
        console.log("Game over");
        console.log('PGN:\n', chess.pgn());
        readline.close();
        return;
    }

    if (chess.turn() === 'w') {
        askMove();
    } else {
        makeRandomMove();
        gameLoop(); // continue
    }
}

//gameLoop();

// ../../proj/ChessBotNeuralNet/