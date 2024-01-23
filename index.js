const Board = require('./Board');

let board = new Board();

board.initPieces();

console.log(board.getAllLegalMoves());

/*
let Network = require('./Network');
let babyNames = require('./names.json');

let numberOfInputs = 64;
let hiddenLayerNeurons = 2;
let outputLayerNeurons = board.whitePieces;

let network = new Network(numberOfInputs, hiddenLayerNeurons, outputLayerNeurons, babyNames);

network.printNetworkDiagram();

network.input([0.05, 0.10], [0.01, 0.99]);
*/