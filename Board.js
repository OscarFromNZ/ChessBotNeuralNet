class Board {
    constructor(playerColour) {
        this.playerPieces = [];
        this.enemyPieces = [];

        this.playerColour = playerColour;

        // pieces are stored as coords, (1, 8)
    }

    initPieces() {
        // pawns (i = 1 so that it statrs at 1, 1);
        for (let i = 1; i < 9; i++) {

            // player
            this.playerPieces.push(
                {
                    type: 'pawn',
                    collumn: i,
                    row: 2,
                    friendly: true
                }
            );

            // enemy
            this.enemyPieces.push(
                {
                    type: 'pawn',
                    collumn: i,
                    row: 7,
                    friendly: false
                }
            );
        }
    }

    // colour: 0 is white, 1 is black
    getAllLegalMoves() {
        let moves = [];

        for (const piece of playerPieces) {
            switch (piece.type) {
                case 'pawn':
                    // check if piece is in front of pawn
                    let pieceInFront = this.getPieceOnSquare(piece.row + 1, piece.collumn);

                    if (pieceInFront) {
                        console.log('piece is in front of pawn so no move');
                    } else {
                        console.log('piece not in front of pawn so can move');

                        moves.push(
                            {
                                type: 'pawn',
                                newCol: piece.collumn,
                                newRol: piece.row + 1,
                                oldCol: piece.collumn,
                                oldRow: piece.row,
                            }
                        );
                    }

                    // check if pawn has moved
                    if (piece.row = 2) {
                        // hasn't
                        moves.push(
                            {
                                type: 'pawn',
                                newCol: piece.collumn,
                                newRol: piece.row + 2,
                                oldCol: piece.collumn,
                                oldRow: piece.row,
                            }
                        );
                    }

                    // check if pawn can take piece
                    let pieceOnDiagonalLeft = this.getPieceOnSquare(piece.row + 1, piece.collumn - 1);
                    let pieceOnDiagonalRight = this.getPieceOnSquare(piece.row + 1, piece.collumn + 1);

                    // if hostile
                    if (!pieceOnDiagonalLeft.friendly) {
                        moves.push(
                            {
                                type: 'pawn',
                                newCol: piece.collumn - 1,
                                newRol: piece.row + 1,
                                oldCol: piece.collumn,
                                oldRow: piece.row,
                            }
                        );
                    }

                    // if hostile
                    if (!pieceOnDiagonalRight.friendly) {
                        moves.push(
                            {
                                type: 'pawn',
                                newCol: piece.collumn + 1,
                                newRol: piece.row + 1,
                                oldCol: piece.collumn,
                                oldRow: piece.row,
                            }
                        );
                    }

                    break;

                case 'rook':
                    break;

                case 'rook':
                    break;

                case 'rook':
                    break;

                case 'rook':
                    break;

                case 'rook':
                    break;
            }
        };

        return moves;
    }

    // colour: 0 is wihte, 1 is black
    calcMove(colour) {

    }

    updateBoard(move) {

    }

    // returns undefined if no piece
    getPieceOnSquare(row, collumn) {
        let pieceOnSquare = undefined;

        for (let piece of this.playerPieces) {
            if (piece.row == row && piece.collumn == collumn) {
                pieceOnSquare = piece;
            }
        }

        if (!isPieceOnSquare) {
            for (let piece of this.enemyPieces) {
                if (piece.row == row && piece.collumn == collumn) {
                    pieceOnSquare = piece;
                }
            }
        }

        return pieceOnSquare;
    }
}

module.exports = Board;