// FILE NO LONGER IN USE

class Board {
    constructor(playerColour) {
        this.playerPieces = [];
        this.enemyPieces = [];

        this.playerColour = playerColour;

        // pieces are stored as coords, (1, 8)
    }

    initPieces() {
        let data = [
            // pawns
            {
                collumns: [1, 2, 3, 4, 5, 6, 7, 8],
                rows: [2, 7]
            },

            // rooks
            {
                collumns: [1, 8],
                rows: [1, 8]
            },

            // knights
            {
                collumns: [1, 8],
                rows: [2, 7]
            },
        ]

        for (let typeOfPiece of data) {
            for (let i = 0; i < typeOfPiece.collumns.length; i++) {
                for (let j = 0; j < typeOfPiece.rows.length; j++) {

                    let side = 'enemyPieces';

                    // player (white side)
                    if (typeOfPiece.rows[i] < 5) {
                        side = 'playerPieces'
                    }

                    this[side].push(
                        {
                            type: 'knight',
                            collumn: 7,
                            row: 8,
                            friendly: false
                        }
                    );

                    console.log(this[side]);
                }
            }
        }

        this.enemyPieces.push(
            {
                type: 'knight',
                collumn: 7,
                row: 8,
                friendly: false
            }
        );
    }

    // colour: 0 is white, 1 is black
    getAllLegalMoves() {
        let moves = [];

        for (const piece of this.playerPieces) {
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
                                newRow: piece.row + 1,
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
                                newRow: piece.row + 2,
                                oldCol: piece.collumn,
                                oldRow: piece.row,
                            }
                        );
                    }

                    // check if pawn can take piece
                    let pieceOnDiagonalLeft = this.getPieceOnSquare(piece.row + 1, piece.collumn - 1);
                    let pieceOnDiagonalRight = this.getPieceOnSquare(piece.row + 1, piece.collumn + 1);

                    // if exists
                    if (pieceOnDiagonalLeft) {
                        // if hostile
                        if (!pieceOnDiagonalLeft.friendly) {
                            // can take
                            moves.push(
                                {
                                    type: 'pawn',
                                    newCol: piece.collumn - 1,
                                    newRow: piece.row + 1,
                                    oldCol: piece.collumn,
                                    oldRow: piece.row,
                                }
                            );
                        }
                    }

                    // if exists
                    if (pieceOnDiagonalRight) {
                        // if hostile
                        if (!pieceOnDiagonalRight.friendly) {
                            // can take
                            moves.push(
                                {
                                    type: 'pawn',
                                    newCol: piece.collumn + 1,
                                    newRow: piece.row + 1,
                                    oldCol: piece.collumn,
                                    oldRow: piece.row,
                                }
                            );
                        }
                    }

                    break;

                /* warning:  super super super bad code */
                case 'rook':
                    // check vertical up
                    let isVerticalUpBlocked = false;
                    for (let i = piece.row; i < 9; i++) {
                        // if there hasn't been any interuptions
                        if (!isVerticalUpBlocked) {
                            let pieceOnSquare = this.getPieceOnSquare(i, piece.collumn);

                            // if encounter piece
                            if (pieceOnSquare) {
                                isVerticalUpBlocked = true;
                            }

                            // add move
                            moves.push(
                                {
                                    type: 'rook',
                                    newCol: piece.collumn,
                                    newRow: i,
                                    oldCol: piece.collumn,
                                    oldRow: piece.row,
                                }
                            );
                        }
                    }

                    // check vertical down
                    let isVerticalDownBlocked = false;
                    for (let i = piece.row; i > 0; i--) {
                        // if there hasn't been any interuptions
                        if (!isVerticalDownBlocked) {
                            let pieceOnSquare = this.getPieceOnSquare(i, piece.collumn);

                            // if encounter piece
                            if (pieceOnSquare) {
                                isVerticalDownBlocked = true;
                            }

                            // add move
                            moves.push(
                                {
                                    type: 'rook',
                                    newCol: piece.collumn,
                                    newRow: i,
                                    oldCol: piece.collumn,
                                    oldRow: piece.row,
                                }
                            );
                        }
                    }

                    // check horizontal right
                    let isHorizontalRightBlocked = false;
                    for (let i = piece.collumn; i < 9; i++) {
                        // if there hasn't been any interuptions
                        if (!isHorizontalRightBlocked) {
                            let pieceOnSquare = this.getPieceOnSquare(piece.row, i);

                            // if encounter piece
                            if (pieceOnSquare) {
                                isHorizontalRightBlocked = true;
                            }

                            // add move
                            moves.push(
                                {
                                    type: 'rook',
                                    newCol: i,
                                    newRow: piece.row,
                                    oldCol: piece.collumn,
                                    oldRow: piece.row,
                                }
                            );
                        }
                    }

                    // check horizontal left
                    let isHorizontalLeftBlocked = false;
                    for (let i = piece.collumn; i > 0; i--) {
                        // if there hasn't been any interuptions
                        if (!isHorizontalLeftBlocked) {
                            let pieceOnSquare = this.getPieceOnSquare(piece.row, i);

                            // if encounter piece
                            if (pieceOnSquare) {
                                isHorizontalLeftBlocked = true;
                            }

                            // add move
                            moves.push(
                                {
                                    type: 'rook',
                                    newCol: i,
                                    newRow: piece.row,
                                    oldCol: piece.collumn,
                                    oldRow: piece.row,
                                }
                            );
                        }
                    }

                    break;

                case 'knight':

                    /*s
                        8        1
                      7            2


                      6            3
                        5        4       
                    */

                    let coordsOfMoves = [
                        [piece.row + 2, piece.collumn + 1],
                        [piece.row + 1, piece.collumn + 2],
                        [piece.row - 1, piece.collumn + 2],
                        [piece.row - 2, piece.collumn + 1],

                        [piece.row - 2, piece.collumn - 1],
                        [piece.row - 1, piece.collumn - 2],
                        [piece.row + 1, piece.collumn - 2],
                        [piece.row + 2, piece.collumn - 1],
                    ];

                    for (let i = 0; i < 8; i++) {
                        let pieceOnSquare = this.getPieceOnSquare(coordsOfMoves[i][0], coordsOfMoves[i][1]);

                        if (pieceOnSquare !== 'impossible') {
                            if (!pieceOnSquare || !pieceOnSquare.friendly) {
                                // add move
                                moves.push(
                                    {
                                        type: 'knight',
                                        newCol: pieceOnSquare.collumn,
                                        newRow: pieceOnSquare.row,
                                        oldCol: piece.collumn,
                                        oldRow: piece.row,
                                    }
                                );
                            }
                        }
                    }

                    break;

                case 'bishop':
                    break;

                case 'king':
                    break;

                case 'queen':
                    break;
            }
        };

        return moves;
    }

    // colour: 0 is wihte, 1 is black
    calcMove(colour) {
        // neural net stuff ig
    }

    updateBoard(move) {
        // check what piece it was that moved
        for (let piece of this.whitePieces) {
            if (piece.row == move.oldRow && piece.collumn == move.oldCol) {

            }
        }

        for (let piece of this.blackPieces) {
            if (piece.row == move.oldRow && piece.collumn == move.oldCol) {

            }
        }
    }

    // returns undefined if no piece
    getPieceOnSquare(row, collumn) {
        let pieceOnSquare = undefined;

        for (let piece of this.playerPieces) {
            if (piece.row == row && piece.collumn == collumn) {
                pieceOnSquare = piece;
            }
        }

        if (!pieceOnSquare) {
            for (let piece of this.enemyPieces) {
                if (piece.row == row && piece.collumn == collumn) {
                    pieceOnSquare = piece;
                }
            }
        }

        if (row < 1 || row > 8 || collumn < 1 || collumn > 8) {
            return 'impossible';
        }

        return pieceOnSquare;
    }
}

module.exports = Board;